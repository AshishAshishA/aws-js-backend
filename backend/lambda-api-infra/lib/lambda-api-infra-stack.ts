import {aws_apigateway, aws_lambda, Duration, Stack, StackProps} from 'aws-cdk-lib';
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
  }
}



export class DeployLambdaAndApiService extends Construct {
  constructor(scope:Construct, id:string){
    super(scope, id)

    const lambdaFunction = new aws_lambda.Function(this, "getProductList", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'getProductList',
      handler:'getProductListHandler.handler',
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/getProductList"))
      
    });

    const lambdaFunction2 = new aws_lambda.Function(this, "getProductsById", {
      runtime:aws_lambda.Runtime.NODEJS_20_X,
      memorySize:1024,
      timeout:Duration.seconds(5),
      functionName: 'getProductsById',
      handler:"getProductsByIdHandler.handler",
      code:aws_lambda.Code.fromAsset(path.join(__dirname, "../dist/handlers/getProductsById"))
    })

    const api = new aws_apigateway.RestApi(this, "task2ApiGateWayPeer", {
        restApiName:"My API Gateway",
        description:"This API serves the Lambda functions"
    });

    const lambdaIntegration = new aws_apigateway.LambdaIntegration(lambdaFunction, {});
    const lambdaIntegration2 = new aws_apigateway.LambdaIntegration(lambdaFunction2, {});

    const productsResource = api.root.addResource("products");
    productsResource.addMethod("GET", lambdaIntegration);

    const productByIdResource = productsResource.addResource("{productId}");
    productByIdResource.addMethod("GET", lambdaIntegration2);


  }


}

