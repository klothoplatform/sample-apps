import * as aws from "@pulumi/aws";
import * as k8s from "@pulumi/kubernetes";
import { PolicyPack, StackValidationPolicy } from "@pulumi/policy";

const eksPolicy: StackValidationPolicy = {
    name: "eks-test",
    description: "Eks integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const eksClusters = args.resources.filter(r => r.isType(aws.eks.Cluster));
        if (eksClusters.length !== 1) {
            reportViolation(`Expected one lambda function but found ${eksClusters.length}`);
            return;
        }
        const cluster = eksClusters[0].asType(aws.eks.Cluster)

        const nodeGroups = args.resources.filter(r => r.isType(aws.eks.NodeGroup));
        if (nodeGroups.length !== 2) {
            reportViolation(`Expected two Node Groups but found ${nodeGroups.length}`);
            return;
        }

        let t3NodeGroupName;
        let c4NodeGroupName;
        console.log(nodeGroups[0].type)
        for (const i in nodeGroups) {
            const group = nodeGroups[i].asType(aws.eks.NodeGroup)!;

            if (group.clusterName != cluster?.name) {
                reportViolation(`Expected cluster name for node group to be ${cluster?.name}, but found ${group.clusterName}`)
            }

            if (group.nodeGroupName.includes("c4-large")) {
                c4NodeGroupName = group.nodeGroupName
                group.diskSize !== 100 ?  reportViolation(`Expected disk size to be '100' fo 'c4.large' node group, but found ${group.diskSize}`) : null
            } else if (group.nodeGroupName.includes("t3-large")) {
                t3NodeGroupName = group.nodeGroupName
                group.diskSize !== 200 ?  reportViolation(`Expected disk size to be '200' fo 't3.large' node group, but found ${group.diskSize}`) : null
            } else {
                reportViolation(`Unknown Node Group, found ${group.nodeGroupName}`)
            }
        }


        const k8Services = args.resources.filter(r => r.isType(k8s.core.v1.Service));
        if (k8Services.length !== 3) {
            reportViolation(`Expected three kubernetes services but found ${k8Services.length}`);
            return;
        }
        // Pulumi Bug which does not typecase k8s resources correctly. https://github.com/pulumi/pulumi-policy/issues/300
        // for (const i in k8Services) {
        //     const service = k8Services[i].asType(k8s.core.v1.Service)!;
        //     console.log(service.id)
        //     if (["users-store", "users-api", "users-info"].includes(service.id)) {
        //         if (service.metadata.labels["klotho-fargate-enabled"]) {
        //             reportViolation(`Kubernetes Service expected to run on node compute type, but found label 'klotho-fargate-enabled: ${service.metadata.labels["klotho-fargate-enabled"]}'`)
        //         }
        //     } else {
        //         reportViolation(`Unknown Kubernetes Service, found ${service.id}`)
        //     }
        // }


        const k8Deployments = args.resources.filter(r => r.isType(k8s.apps.v1.Deployment));
        if (k8Deployments.length !== 3) {
            reportViolation(`Expected three kubernetes deployments but found ${k8Deployments.length}`);
            return;
        }
        // Pulumi Bug which does not typecase k8s resources correctly. https://github.com/pulumi/pulumi-policy/issues/300
        // for (const i in k8Deployments) {
        //     const deployment = k8Deployments[i].asType(k8s.apps.v1.Deployment)!;
        //     if (deployment.spec.template.metadata.labels["klotho-fargate-enabled"]) {
        //         reportViolation(`Kubernetes Service expected to run on node compute type, but found label 'klotho-fargate-enabled: ${deployment.metadata.labels["klotho-fargate-enabled"]}'`)
        //     }
        //     if ("users-store" === deployment.id) {
        //         if (deployment.spec.replicas !== 2) {
        //             reportViolation(`Kubernetes Deployment expected to have '2' replicas, but found '${deployment.spec.replicas}'`)
        //         }
        //         if (deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup'] === t3NodeGroupName) {
        //             reportViolation(`Kubernetes Deployment expected to nodeSelector of node group '${t3NodeGroupName}', but found '${deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup']}'`)
        //         }
        //     } else if ("users-api" === deployment.id) {
        //         if (deployment.spec.replicas !== 1) {
        //             reportViolation(`Kubernetes Deployment expected to have '1' replicas, but found '${deployment.spec.replicas}'`)
        //         }
        //         if (deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup'] === c4NodeGroupName) {
        //             reportViolation(`Kubernetes Deployment expected to nodeSelector of node group '${c4NodeGroupName}', but found '${deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup']}'`)
        //         }
        //     } else if ("users-info"=== deployment.id) {
        //         if (deployment.spec.replicas !== 2) {
        //             reportViolation(`Kubernetes Deployment expected to have '2' replicas, but found '${deployment.spec.replicas}'`)
        //         }
        //         if (deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup']) {
        //             reportViolation(`Kubernetes Deployment not expected to nodeSelector of node group, but found '${deployment.spec.template.spec.nodeSelector['eks.amazonaws.com/nodegroup']}'`)
        //         }
        //         const env = deployment.spec.template.spec.containers[0].env
        //         const rdsEnvVar = "sequelizeDB_persist_orm_CONNECTION".toUpperCase()
        //         if (!env.filter(envVar => envVar.name === rdsEnvVar)) {
        //             reportViolation(`Expected deployment ${deployment.id} to have rds connection string set in environment variables`)
        //         }
        //     }
        //      else {
        //         reportViolation(`Unknown Kubernetes deployment, found ${deployment.id}`)
        //     }
        // }
    },
}

const databasePolicy: StackValidationPolicy = {
    name: "database-test",
    description: "Ecs integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const rdsInstances = args.resources.filter(r => r.isType(aws.rds.Instance));
        if (rdsInstances.length !== 1) {
            reportViolation(`Expected one ecs task but found ${rdsInstances.length}`);
            return;
        }

        const ddbTables = args.resources.filter(r => r.isType(aws.dynamodb.Table));
        if (ddbTables.length !== 1) {
            reportViolation(`Expected one DynamoDB table but found ${ddbTables.length}`);
            return;
        }
    },
}


const tests = new PolicyPack("tests-pack", {
    policies: [eksPolicy, databasePolicy],
});