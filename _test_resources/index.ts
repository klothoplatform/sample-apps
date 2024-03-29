import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

const tags = {
    "klothoIntegrationTests": "sample-apps-pro"
}

const config = new pulumi.Config()

const vpc = new awsx.ec2.Vpc("vpc", {
    cidrBlock: '10.0.0.0/16',
    enableDnsHostnames: true,
    enableDnsSupport: true,
    numberOfAvailabilityZones: 2,
    subnetSpecs: [{ type: 'Public' }, { type: 'Private' }],
    tags
})


const sg = new aws.ec2.SecurityGroup('sg', {
    name: `${config.name}-sg`,
    vpcId: vpc.vpcId,
    egress: [
        {
            cidrBlocks: ['0.0.0.0/0'],
            description: 'Allows all outbound IPv4 traffic.',
            fromPort: 0,
            protocol: '-1',
            toPort: 0,
        },
    ],
    ingress: [
        {
            description:
                'Allows inbound traffic from network interfaces and instances that are assigned to the same security group.',
            fromPort: 0,
            protocol: '-1',
            self: true,
            toPort: 0,
        },
        {
            description: 'For EKS control plane',
            cidrBlocks: ['0.0.0.0/0'],
            fromPort: 9443,
            protocol: 'TCP',
            self: true,
            toPort: 9443,
        },
    ],
    tags: {
      test: config.name,
      ...tags
    }
})

vpc.subnets.apply((subnets) => {
    const cidrBlocks = pulumi.all(subnets.map(s => s.cidrBlock)).apply(blocks => {
        const s = new Set(blocks.filter(b => b != undefined) as string[])
        return [...s]
    })
    new aws.ec2.SecurityGroupRule(`ingress`, {
        type: 'ingress',
        cidrBlocks: cidrBlocks,
        fromPort: 0,
        protocol: '-1',
        toPort: 0,
        securityGroupId: sg.id,
    })
})


// RDS Resources

const username = "testuser"
const password = "testpassword"


const subnetGroup = new aws.rds.SubnetGroup('rds-subnet-group', {
    subnetIds: vpc.privateSubnetIds,
    tags: {
        Name: 'Klotho DB subnet group',
        ...tags
    },
})


// create the db resources
const dbName = "testdb"

const rds = new aws.rds.Instance(
    dbName,
    {
        instanceClass: 'db.t4g.micro',
        allocatedStorage:  20,
        skipFinalSnapshot: true,
        engineVersion:     "13.7",
        engine: 'postgres',
        dbName: dbName,
        username,
        password,
        iamDatabaseAuthenticationEnabled: true,
        dbSubnetGroupName: subnetGroup.name,
        vpcSecurityGroupIds: [sg.id],
        tags
    }
)

// setup secrets for the proxy

let rdsSecret = new aws.secretsmanager.Secret('rds-secret', {
    recoveryWindowInDays: 0,
    tags
})

const rdsSecretValues = {
    username: username,
    password: password,
    engine: 'postgres',
    host: rds.address,
    port: rds.port,
    dbname: dbName,
    dbInstanceIdentifier: rds.id,
    iamDatabaseAuthenticationEnabled: false,
}

const secret = new aws.secretsmanager.SecretVersion(`rds-secret`, {
    secretId: rdsSecret.id,
    secretString: pulumi.output(rdsSecretValues).apply((v) => JSON.stringify(v)),
})

//setup role for proxy
const role = new aws.iam.Role('orm-secret-role', {
    assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Principal: {
                    Service: 'rds.amazonaws.com',
                },
                Action: 'sts:AssumeRole',
            },
        ],
    },
    tags
})

// prettier-ignore
const policy = new aws.iam.Policy('orm-policy', {
    description: 'klotho orm secret policy',
    policy: {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Action: 'secretsmanager:GetSecretValue',
                Resource: [secret.arn],
            },
        ],
    },
    tags
})

const attach = new aws.iam.RolePolicyAttachment(`${dbName}-ormattach`, {
    role: role.name,
    policyArn: policy.arn,
})

// setup the rds proxy
const proxy = new aws.rds.Proxy('rds-proxy', {
    debugLogging: false,
    engineFamily: 'POSTGRESQL',
    idleClientTimeout: 1800,
    requireTls: false,
    roleArn: role.arn,
    vpcSecurityGroupIds: [sg.id],
    vpcSubnetIds: vpc.privateSubnetIds,
    auths: [
        {
            authScheme: 'SECRETS',
            description: 'use the secrets generated by klotho',
            iamAuth: 'DISABLED',
            secretArn: secret.arn,
        },
    ],
    tags
})

const proxyDefaultTargetGroup = new aws.rds.ProxyDefaultTargetGroup(`${dbName}`, {
    dbProxyName: proxy.name,
    connectionPoolConfig: {
        connectionBorrowTimeout: 120,
        maxConnectionsPercent: 100,
        maxIdleConnectionsPercent: 50,
    },
})
const proxyTarget = new aws.rds.ProxyTarget(`${dbName}`, {
    dbInstanceIdentifier: rds.id,
    dbProxyName: proxy.name,
    targetGroupName: proxyDefaultTargetGroup.name,
})



// elasticache redis resources

const clusterName = "elasticache-redis"
const logGroupName = `/aws/elasticache/${clusterName}-persist-redis`
let cloudwatchGroup = new aws.cloudwatch.LogGroup(`persist-redis-${clusterName}-lg`, {
    name: `${logGroupName}`,
    retentionInDays: 0,
    tags
})

const elasticachesubnetGroup = new aws.elasticache.SubnetGroup(`${clusterName}-subnet-group`,{
        subnetIds: vpc.privateSubnetIds,
        tags
    }
)

new aws.elasticache.Cluster(
    clusterName,
    {
        engine: 'redis',
        nodeType:      "cache.t3.micro",
        numCacheNodes: 1,
        logDeliveryConfigurations: [
            {
                destination: cloudwatchGroup.name,
                destinationType: 'cloudwatch-logs',
                logFormat: 'text',
                logType: 'slow-log',
            },
            {
                destination: cloudwatchGroup.name,
                destinationType: 'cloudwatch-logs',
                logFormat: 'json',
                logType: 'engine-log',
            },
        ],
        subnetGroupName: elasticachesubnetGroup.name,
        securityGroupIds: [sg.id],
        tags
    },
)


// memorydb resources
const memdbClusterName = 'memorydb-cluster'
const memdbSubnetGroup = new aws.memorydb.SubnetGroup(`${memdbClusterName}-subnetgroup`,{
        subnetIds: vpc.privateSubnetIds,
        tags
    }
)

new aws.memorydb.Cluster(
    memdbClusterName,
    {
        numReplicasPerShard: 1,
        numShards:           2,
        aclName: 'open-access',
        nodeType: 'db.t4g.small',
        securityGroupIds: [sg.id],
        snapshotRetentionLimit: 7,
        subnetGroupName: memdbSubnetGroup.name,
        tags
    },
)