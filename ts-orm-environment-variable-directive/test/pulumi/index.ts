import * as aws from "@pulumi/aws";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const stackPolicy: StackValidationPolicy = {
    name: "rds-test",
    description: "RDS integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const rdsInstances = args.resources.filter(r => r.isType(aws.rds.Instance));
        if (rdsInstances.length !== 1) {
            reportViolation(`Expected one RDS Instance but found ${rdsInstances.length}`);
            return;
        }

        const rds = rdsInstances[0].asType(aws.rds.Instance)!;
        if (rds.allocatedStorage !== 20) {
            reportViolation(
                `Expected rds Instance '${rds.name}' allocated storage to be '20' but found '${rds.allocatedStorage}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}


const tests = new PolicyPack("tests-pack", {
    policies: [stackPolicy],
});