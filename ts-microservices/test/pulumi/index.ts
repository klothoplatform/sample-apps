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
                `Expected rds Instance '${lambda.name}' allocated storage to be '1024' but found '${lambda.memorySize}'`);
        }
        if (lambda.timeout !== 120) {
            reportViolation(
                `Expected rds Instance '${lambda.name}' allocated storage to be '120' but found '${lambda.timeout}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}

const ecsFargatePolicy: StackValidationPolicy = {
    name: "ecs-test",
    description: "Ecs integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const ecsTasks = args.resources.filter(r => r.isType(awsx.ecs.FargateTaskDefinition));
        if (ecsTasks.length !== 1) {
            reportViolation(`Expected one lambda function but found ${ecsTasks.length}`);
            return;
        }

        const task = ecsTasks[0].asType(aws.ecs.TaskDefinition)!;
        if (task.memory !== "128") {
            reportViolation(
                `Expected rds Instance '${task.id}' allocated storage to be '128' but found '${task.memory}'`);
        }
        if (task.cpu !== "256") {
            reportViolation(
                `Expected rds Instance '${task.id}' allocated storage to be '256' but found '${task.cpu}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}


const tests = new PolicyPack("tests-pack", {
    policies: [lambdaPolicy, ecsFargatePolicy],
});