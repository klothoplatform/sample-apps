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
        if (nodeGroups.length !== 1) {
            reportViolation(`Expected one Node Groups but found ${nodeGroups.length}`);
            return;
        }



        const charts = args.resources.filter(r => r.isType(k8s.helm.v3.Chart));
        if (charts.length !== 2) {
            reportViolation(`Expected two helm charts but found ${charts.length}`);
            return;
        }
    },
}

const databasePolicy: StackValidationPolicy = {
    name: "database-test",
    description: "Ecs integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const rdsInstances = args.resources.filter(r => r.isType(aws.rds.Instance));
        if (rdsInstances.length !== 1) {
            reportViolation(`Expected rds instance but found ${rdsInstances.length}`);
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