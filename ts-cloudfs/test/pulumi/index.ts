import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const lambdaPolicy: StackValidationPolicy = {
    name: "lambda-test",
    description: "Lambda integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const lambdas = args.resources.filter(r => r.isType(aws.lambda.Function));
        const expectedCount = 1
        if (lambdas.length !== expectedCount) {
            reportViolation(`Expected ${expectedCount} lambda function but found ${lambdas.length}`);
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


const tests = new PolicyPack("tests-pack", {
    policies: [lambdaPolicy],
});

