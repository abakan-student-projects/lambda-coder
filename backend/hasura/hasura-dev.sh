#! /bin/bash
docker run -d -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://lambda:lambda@host.docker.internal:5432/lambda_coder \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=false \
       -e HASURA_GRAPHQL_DEV_MODE=true \
       -e HASURA_GRAPHQL_ADMIN_SECRET=devsecret \
       -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \
       hasura/graphql-engine:latest

