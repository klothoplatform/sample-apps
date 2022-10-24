import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const lambdaPolicy: StackValidationPolicy = {
    name: "lambda-test",
    description: "Lambda integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const lambdas = args.resources.filter(r => r.isType(aws.lambda.Function));
        if (lambdas.length !== 3) {
            reportViolation(`Expected three lambda function but found ${lambdas.length}`);
            return;
        }

        const lambda = lambdas[0].asType(aws.lambda.Function)!;
        if (lambda.memorySize !== 512) {
            reportViolation(
                `Expected rds Instance '${lambda.name}' allocated storage to be '512' but found '${lambda.memorySize}'`);
        }
        if (lambda.timeout !== 180) {
            reportViolation(
                `Expected rds Instance '${lambda.name}' allocated storage to be '180' but found '${lambda.timeout}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}

const dynamoPolicy: StackValidationPolicy = {
    name: "dynamo-test",
    description: "dynamo integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const tables = args.resources.filter(r => r.isType(aws.dynamodb.Table));
        if (tables.length !== 1) {
            reportViolation(`Expected one dynamo table but found ${tables.length}`);
            return;
        }

        const table = tables[0].asType(aws.dynamodb.Table)!;
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}

const snsPolicy: StackValidationPolicy = {
    name: "sns-test",
    description: "sns integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const topics = args.resources.filter(r => r.isType(aws.sns.Topic));
        if (topics.length !== 2) {
            reportViolation(`Expected two sns topic but found ${topics.length}`);
            return;
        }

        const topic = topics[0].asType(aws.sns.Topic)!;
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}


const tests = new PolicyPack("tests-pack", {
    policies: [lambdaPolicy, dynamoPolicy, snsPolicy],
});

