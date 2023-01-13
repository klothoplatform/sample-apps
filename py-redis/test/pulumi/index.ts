import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi"
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const stackPolicy: StackValidationPolicy = {
    name: "redis-test",
    description: "Redis integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const clusters = args.resources.filter(r => r.isType(aws.elasticache.Cluster));
        if (clusters.length !== 1) {
            reportViolation(`Expected one elasticache cluster but found ${clusters.length}`);
            return;
        }

        const cluster = clusters[0].asType(aws.elasticache.Cluster)!;
        if (cluster.engine !== "redis") {
            reportViolation(
                `Expected elasticache cluster engine to be 'redis' but found '${cluster.engine}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}
const tests = new PolicyPack("tests-pack", {
    policies: [stackPolicy],
});