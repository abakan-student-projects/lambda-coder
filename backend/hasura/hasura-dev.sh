#! /bin/bash
docker run -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://lambda:lambda@192.168.1.142:5432/lambda_coder \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=false \
       -e HASURA_GRAPHQL_DEV_MODE=true \
       -e HASURA_GRAPHQL_ADMIN_SECRET=devsecret \
       -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \
       -e HASURA_GRAPHQL_JWT_SECRET='{"type": "HS256", "key": "quiyweuyqwieuqywh902492837823hsamnxc", "claims_format": "json"}' \
       hasura/graphql-engine:latest 
       /e/dev/lambda-calculus/lambda-coder/backend/hasura/hasura.exe --admin-secret=devsecret console

