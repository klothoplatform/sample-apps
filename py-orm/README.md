Orm Sample App
==============

The orm sample app shows how to use the ``klotho::persist`` annotation with the `sqlAlchemy <https://www.sqlalchemy.org/>`_ Library.

Prerequisites
-------------

This guide assumes:

* pulumi is `configured with the proper AWS credentials <https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account>`_

Run the app locally
-------------------

::

    make install
    make run

Hit your endpoints::

    curl http://localhost:8000 -X PUT
    # > "Success"%

    curl http://localhost:8000/patrick
    # > [{"User":{"id":3,"fullname":"Patrick Star","name":"patrick"}}]%

Compile and Deploy with Klotho
------------------------------

::

    # Compile the app
    klotho . --app py-orm -p aws

    # Go into the compiled directory
    cd compiled

    # If you didn't set the aws region as indicated in the compiler output, do that now
    pulumi config set aws:region YOUR_REGION -s py-orm


    # Set username and password
    pulumi config set py-orm:typeormdb_username <USERNAME> -s py-orm
    pulumi config set --secret py-orm:typeormdb_password <PASSWORD> -s py-orm


    # npm install
    npm install

    # Deploy
    pulumi up -s py-orm

    # Outputs: {
    #   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
    # }

Calling your service
--------------------
 
::

    # Add a user 
    curl -X PUT  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/
    # > success

    # Get all users
    curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/patrick
    # > [{"User":{"id":3,"fullname":"Patrick Star","name":"patrick"}}]

Clean Up
--------
 
From the ``compiled`` directory::

    # Tear down when done
    pulumi destroy -s py-orm
