#!/bin/bash

# Pulumi has trouble deleting the ENIs and VPCs.
# We'll delete them manually, to help it out

set -euo pipefail

if [[ -z "$AWS_REGION" ]]; then
  echo >&2 "must export AWS_REGION"
  exit 1
fi
export AWS_DEFAULT_REGION="$AWS_REGION" # some AWS CLI commands prefer this

tmp_file="$(mktemp)"
pulumi -s "$STACK_NAME" -C compiled stack export > "$tmp_file"
echo '::group::stack json'
cat "$tmp_file"
echo '::endgroup::'

vpc_ids="$(cat "$tmp_file" | jq -r '.deployment.resources[] | select(.type == "aws:ec2/vpc:Vpc") | .id')"
for vpc_id in $vpc_ids ; do
  echo "found vpc: $vpc_id"
  eni_ids="$(aws ec2 describe-network-interfaces --filter "Name=vpc-id,Values=$vpc_id" | jq -r '.NetworkInterfaces[].NetworkInterfaceId')"
  while read eni_id ; do
    [[ -z "$eni_id" ]] && continue
    echo "deleting $eni_id because $vpc_id depends on it"
    aws ec2 delete-network-interface --network-interface-id "$eni_id"
  done <<< "$eni_ids"

  sg_ids="$(aws ec2 describe-security-groups --filters Name=vpc-id,Values="$vpc_id" | jq -r '.SecurityGroups[] | select(.GroupName != "default") | .GroupId')"
  while read sg_id ; do
    [[ -z "$sg_id" ]] && continue
    echo "deleting $sg_id because $vpc_id depends on it"
    aws ec2 delete-security-group --group-id "$sg_id"
  done <<< "$sg_ids"
done

subnet_ids="$(cat "$tmp_file" | jq -r '.deployment.resources[] | select(.type == "aws:ec2/subnet:Subnet") | .id')"
for subnet_id in $subnet_ids ; do
  echo "found subnet: $subnet_id"
  eni_ids="$(aws ec2 --region ca-central-1 describe-network-interfaces --filter "Name=subnet-id,Values=$subnet_id" | jq -r '.NetworkInterfaces[].NetworkInterfaceId')"
  while read eni_id ; do
    [[ -z "$eni_id" ]] && continue
    echo "deleting $eni_id because $vpc_id depends on it"
    aws ec2 delete-network-interface --network-interface-id "$eni_id"
  done <<< "$eni_ids"

done
