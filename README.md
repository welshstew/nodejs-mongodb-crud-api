# nodejs-mongodb-crud-api

Simple api to post/get tutorial model from a mongodb.  Uses express.

Based on: https://bezkoder.com/node-express-mongodb-crud-rest-api/


### Environment variables to set:
```
DATABASE_SERVICE_NAME=MONGODB
MONGODB_SERVICE_HOST=
MONGODB_SERVICE_PORT=
MONGODB_DATABASE=
MONGODB_USER=
MONGODB_PASSWORD=
```

### Local
```
export DATABASE_SERVICE_NAME=MONGODB
export MONGODB_SERVICE_HOST=localhost
export MONGODB_SERVICE_PORT=27017
export MONGODB_DATABASE=swinches
```


### Docker
```
docker build . -t quay.io/swinches/tutorial-crud-api:latest
docker push quay.io/swinches/tutorial-crud-api:latest
```

### Helm

```
git clone https://github.com/welshstew/sample-helm-chart
helm install tutorial1 ./sample-helm-chart/tutorial-crud-api
```

## Running in knative

After creating a deployment with helm

```
oc create -f knative-service.yaml
```

Get the knative route with:

```
oc get ksvc knative-crud-api  --output=custom-columns=NAME:.metadata.name,URL:.status.url
```

Post and Get tutorials:

```
curl --location --request POST '$ROUTE_URL/api/tutorials' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title" : "Node knative 1",
    "description": "test"
}'


curl --location --request GET '$ROUTE_URL/api/tutorials' 
```
