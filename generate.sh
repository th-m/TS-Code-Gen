#!/bin/bash
set -eux
srcPath="./src/schema/petstore"
swaggerFile="$srcPath/swagger.json"
openapiFile="$srcPath/openapi.json"
tsFile="$srcPath/types.ts"
jsonFile="$srcPath/json.ts"

curl --request GET --url https://petstore.swagger.io/v2/swagger.json > $swaggerFile
  
npx swagger2openapi --outfile $openapiFile $swaggerFile
npx openapi-typescript $openapiFile --output $tsFile

tmpOpenapi=$(cat $openapiFile)
echo -n -E "export const petstoreJSON = $tmpOpenapi as const" > $jsonFile;