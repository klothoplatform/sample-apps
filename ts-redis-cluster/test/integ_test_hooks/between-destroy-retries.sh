#!/bin/bash

# See #212

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

function wait_for_delete() {
  cluster_name="$1"
  now="$(date +%s)"
  timeout=$(( $now + 1200 )) # 20 minutes
  while [[ "$timeout" -gt "$(date +%s)" ]]; do
    if ! &>/dev/null aws --region "$AWS_REGION" memorydb describe-clusters --cluster-name "$cluster_name" ; then
      return
    else
      echo "$(date): waiting another minute..."
      sleep 60
    fi
  done
  echo "Timed out!"
  exit 1
}

sg_names="$(cat "$tmp_file" | jq -r '.deployment.resources[] | select(.type ==  "aws:memorydb/subnetGroup:SubnetGroup") | .outputs.name')"
for sg_name in $sg_names ; do
  cluster_names="$(aws --region "$AWS_REGION" memorydb describe-clusters | jq -r '.Clusters[] | select(.SubnetGroupName == $sgName) | .Name' --arg sgName "$sg_name")"
  for cluster_name in $cluster_names ; do
    echo "::group::deleting memorydb $cluster_name"
    aws --region "$AWS_REGION" memorydb delete-cluster --cluster-name "$cluster_name"
    echo '::endgroup::'
  done
  for cluster_name in $cluster_names ; do
    echo "::group::waiting for memorydb $cluster_name to delete"
    wait_for_delete "$cluster_name"
    echo '::endgroup::'
  done
done
 
