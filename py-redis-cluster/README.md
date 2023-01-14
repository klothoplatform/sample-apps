# Redis Sample App

The Redis sample app shows how to use the `klotho::persist` annotation on a python redis client to store data.

## Prerequisites

This guide assumes:

* pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

To install Redis locally follow the instructions on the official Redis [getting started page](https://redis.io/docs/getting-started/).

To set up our [local redis cluster](https://redis.io/docs/management/scaling/#create-and-use-a-redis-cluster), we have defined four Redis node configurations in subdirectories of `local-redis-cluster`.

Within each sub-directory `8001`, `8002`, `8003` run:

```shell
    redis-server ./redis.conf
```

This command starts the Redis server on the corresponding port (`8001`, etc). The command will block while the server is up, so you must run each command in a separate terminal session. Alternatively, you can start them all via:

```shell
for conf_dir in local-redis-cluster/* ; do
  pushd "$conf_dir" >/dev/null
  printf "Listening to Redis on port $(basename "$conf_dir") with PID: "
  redis-server ./redis.conf >./redis-server.out 2>./redis-server.err &
  popd >/dev/null
done
```

This will spawn each server in a background process; you can use your usual shell job management tools to kill these processes when you're done.

Once all redis nodes are running:

```shell
redis-cli --cluster create 127.0.0.1:8001 127.0.0.1:8002 127.0.0.1:8003
```

Once the redis cluster is up and running:

```shell
make install
make run
```

`make run` will block while the server is up, so start it in a separate shell session or use ``&&`` to run it in the background.

Hit your endpoints:

```shell
curl -X PUT  http://localhost:3000/users -d '{"first_name": "john", "last_name": "doe"}' -H "Content-Type: application/json"
# > Success

curl http://localhost:3000/users/john
# > doe
```


## Compile and deploy with Klotho

run the terminal commands:
```shell
# Compile the app
klotho . --app py-redis-cluster --provider aws --config klotho.yaml

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-redis-cluster

# npm install
npm install

# Deploy
pulumi up -s py-redis-cluster

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }
```
   

## Calling your service
```shell
# Add a user 
curl -X PUT  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/users -d '{"first_name": "john", "last_name": "doe"}' -H "Content-Type: application/json"
# > Success

# Get all users
curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users/john
# > doe
```
    

## Clean Up

From the `compiled` directory:

```shell
# Tear down when done
pulumi destroy -s py-redis-cluster
```

