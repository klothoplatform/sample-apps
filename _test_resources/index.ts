import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'


const config = new pulumi.Config()

const vpc = new awsx.ec2.Vpc("vpc", {
    cidrBlock: '10.0.0.0/16',
    enableDnsHostnames: true,
    enableDnsSupport: true,
    numberOfAvailabilityZones: 2,
    subnetSpecs: [{ type: 'Public' }, { type: 'Private' }],
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
    }
})

vpc.subnets.apply((subnets) => {
    const cidrBlocks = pulumi.all(subnets.map(s => s.cidrBlock)).apply(blocks => blocks.filter(b => b != undefined) as string[])
    for (const subnet of subnets) {
        subnet.id.apply((id) => {
            new aws.ec2.SecurityGroupRule(`${id}-ingress`, {
                type: 'ingress',
                cidrBlocks: cidrBlocks,
                fromPort: 0,
                protocol: '-1',
                toPort: 0,
                securityGroupId: sg.id,
            })
        })
    }
})
