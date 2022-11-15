import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const lambdaPolicy: StackValidationPolicy = {
    name: "lambda-test",
    description: "Lambda integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const lambdas = args.resources.filter(r => r.isType(aws.lambda.Function));
        if (lambdas.length !== 1) {
            reportViolation(`Expected one lambda function but found ${lambdas.length}`);
            return;
        }

        const lambda = lambdas[0].asType(aws.lambda.Function)!;
        if (lambda.memorySize !== 1024) {
            reportViolation(
                `Expected lambda function '${lambda.name}' allocated storage to be '1024' but found '${lambda.memorySize}'`);
        }
        if (lambda.timeout !== 120) {
            reportViolation(
                `Expected lambda function '${lambda.name}' allocated storage to be '120' but found '${lambda.timeout}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}

const ecsFargatePolicy: StackValidationPolicy = {
    name: "ecs-test",
    description: "Ecs integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const ecsTasks = args.resources.filter(r => r.isType(aws.ecs.TaskDefinition));
        if (ecsTasks.length !== 1) {
            reportViolation(`Expected one ecs task but found ${ecsTasks.length}`);
            return;
        }
    },
}

const dynamoDbPolicy: StackValidationPolicy = {
    name: "dynamo-test",
    description: "dynamo integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const ddbTables = args.resources.filter(r => r.isType(aws.dynamodb.Table));
        if (ddbTables.length !== 1) {
            reportViolation(`Expected one DynamoDB table but found ${ddbTables.length}`);
            return;
        }
    }
}


const tests = new PolicyPack("tests-pack", {
    policies: [lambdaPolicy, ecsFargatePolicy, dynamoDbPolicy],
});
