import {aws_apigateway, aws_lambda, aws_dynamodb, Duration, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaAndApiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new DeployLambdaAndApiService(this, "lambdaAndApiDeployment")

    // new DeploySwaggerLambdaAndApiService(this, "swaggerLambdaAndApiDeployment") 
  }
}



export class DeployLambdaAndApiService extends Construct {
  constructor(scope:Construct, id:string){
    super(scope, id)

    const productsTable = aws_dynamodb.Table.fromTableName(this, 'ProductsTable', 'products');
    const stocksTable = aws_dynamodb.Table.fromTableName(this, 'StocksTable', 'stocks');

    const lambdaFunction = new aws_lambda.Function(this, "getProductList", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'getProductList2',
      handler:'getProductListHandler.handler',
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/getProductList"))
      
    });

    const lambdaFunction2 = new aws_lambda.Function(this, "getProductsById", {
      runtime:aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'getProductsById2',
      handler:"getProductsByIdHandler.handler",
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/getProductsById"))
    })

    const lambdaFunction3 = new aws_lambda.Function(this, "createProduct", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'createProduct2',
      handler:'createProductsHandler.handler',
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/createProducts"))
      
    });

    productsTable.grantReadWriteData(lambdaFunction);
    stocksTable.grantReadWriteData(lambdaFunction2);
    productsTable.grantReadWriteData(lambdaFunction3);

    stocksTable.grantReadWriteData(lambdaFunction);
    productsTable.grantReadWriteData(lambdaFunction2);
    stocksTable.grantReadWriteData(lambdaFunction3);

    const api = new aws_apigateway.RestApi(this, "task2ApiGateWayPeer", {
        restApiName:"My API Gateway",
        description:"This API serves the Lambda functions"
    });

    const lambdaIntegration = new aws_apigateway.LambdaIntegration(lambdaFunction, {});
    const lambdaIntegration2 = new aws_apigateway.LambdaIntegration(lambdaFunction2, {});
    const lambdaIntegration3 = new aws_apigateway.LambdaIntegration(lambdaFunction3, {});

    const productsResource = api.root.addResource("products");
    productsResource.addMethod("GET", lambdaIntegration);

    const productByIdResource = productsResource.addResource("{productId}");
    productByIdResource.addMethod("GET", lambdaIntegration2);

    const createProductResource = productsResource.addResource("create");
    createProductResource.addMethod("POST", lambdaIntegration3);

  }


}



export class DeploySwaggerLambdaAndApiService extends Construct {
  constructor(scope:Construct, id:string){
    super(scope, id)


    const lambdaFunction3 = new aws_lambda.Function(this, "swaggerUI", {
      runtime:aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'swaggerUI',
      handler:"swaggerHandler.handler",
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/swagger"))
    })

    const api = new aws_apigateway.RestApi(this, "swaggerApiGateWayPeer", {
        restApiName:"My API Gateway",
        description:"This API serves the Lambda functions"
    });

    const lambdaIntegration3 = new aws_apigateway.LambdaIntegration(lambdaFunction3, {});

    const swaggerResource = api.root.addResource("swagger");
    swaggerResource.addMethod("GET", lambdaIntegration3);

  }


}

