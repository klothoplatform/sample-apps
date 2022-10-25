pulumi config set $STACK_NAME:usersdb_username testuser -s $STACK_NAME -C compiled
pulumi config set $STACK_NAME:usersdb_password testpassword -s $STACK_NAME -C compiled