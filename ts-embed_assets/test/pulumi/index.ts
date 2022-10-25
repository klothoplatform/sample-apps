import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";
import {KlothoPolicyPackGenerator} from '../../../policy-pack-generator/policy-pack-generator'

const gen = new KlothoPolicyPackGenerator('../../compiled/klotho.yaml')

const lambdaPolicy: StackValidationPolicy = {
    name: "lambda-test",
    description: "Lambda integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const lambdas = args.resources.filter(r => r.isType(aws.lambda.Function));
        if (lambdas.length !== 2) {
            reportViolation(`Expected one lambda function but found ${lambdas.length}`);
            return;
        }

        for (const lambdaObj of lambdas) {
          const lambda = lambdaObj.asType(aws.lambda.Function)!
          if (lambda.memorySize !== 512) {
              reportViolation(
                  `Expected lambda function '${lambda.name}' memory size to be '512' but found '${lambda.memorySize}'`);
          }
          if (lambda.timeout !== 180) {
              reportViolation(
                  `Expected lambda function '${lambda.name}' timeout to be '180' but found '${lambda.timeout}'`);
          }
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}


const tests = new PolicyPack("tests-pack", {
    policies: [lambdaPolicy],
});

