pulumi config set $STACK_NAME:sqlalchemy_username testuser -s $STACK_NAME -C compiled
pulumi config set $STACK_NAME:sqlalchemy_password testpassword -s $STACK_NAME -C compiled