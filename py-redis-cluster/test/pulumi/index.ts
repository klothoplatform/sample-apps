import * as aws from "@pulumi/aws";
import { PolicyPack, validateResourceOfType, StackValidationPolicy } from "@pulumi/policy";

const stackPolicy: StackValidationPolicy = {
    name: "redis-test",
    description: "Redis cluster (memorydb) integration tests.",
    enforcementLevel: "mandatory",
    validateStack: async (args, reportViolation) => {
        const clusters = args.resources.filter(r => r.isType(aws.memorydb.Cluster));
        if (clusters.length !== 1) {
            reportViolation(`Expected one memorydb cluster but found ${clusters.length}`);
            return;
        }

        const cluster = clusters[0].asType(aws.memorydb.Cluster)!;
        if (cluster.aclName !== "open-access") {
            reportViolation(
                `Expected memorydb cluster acl to be 'open-access' but found '${cluster.aclName}'`);
        }
        if (cluster.numReplicasPerShard !== 1) {
            reportViolation(
                `Expected memorydb cluster numReplicasPerShard to be '2' but found '${cluster.numReplicasPerShard}'`);
        }
        if (cluster.numShards !== 2) {
            reportViolation(
                `Expected memorydb cluster numShards to be '2' but found '${cluster.numShards}'`);
        }
        // TODO: check remainder of the resources set by klotho.yaml or others we want to validate
    },
}
const tests = new PolicyPack("tests-pack", {
    policies: [stackPolicy],
});