"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploySwaggerLambdaAndApiService = exports.DeployLambdaAndApiService = exports.LambdaAndApiDeploymentStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const path_1 = __importDefault(require("path"));
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class LambdaAndApiDeploymentStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'InfraQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
        new DeployLambdaAndApiService(this, "lambdaAndApiDeployment");
        // new DeploySwaggerLambdaAndApiService(this, "swaggerLambdaAndApiDeployment") 
    }
}
exports.LambdaAndApiDeploymentStack = LambdaAndApiDeploymentStack;
class DeployLambdaAndApiService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = aws_cdk_lib_1.aws_dynamodb.Table.fromTableName(this, 'ProductsTable', 'products');
        const lambdaFunction = new aws_cdk_lib_1.aws_lambda.Function(this, "getProductList", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'getProductList',
            handler: 'getProductListHandler.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/getProductList"))
        });
        const lambdaFunction2 = new aws_cdk_lib_1.aws_lambda.Function(this, "getProductsById", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'getProductsById',
            handler: "getProductsByIdHandler.handler",
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/getProductsById"))
        });
        const lambdaFunction3 = new aws_cdk_lib_1.aws_lambda.Function(this, "createProduct", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'createProduct',
            handler: 'createProductsHandler.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/createProducts"))
        });
        table.grantReadWriteData(lambdaFunction);
        table.grantReadWriteData(lambdaFunction2);
        table.grantReadWriteData(lambdaFunction3);
        const api = new aws_cdk_lib_1.aws_apigateway.RestApi(this, "task2ApiGateWayPeer", {
            restApiName: "My API Gateway",
            description: "This API serves the Lambda functions"
        });
        const lambdaIntegration = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction, {});
        const lambdaIntegration2 = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction2, {});
        const lambdaIntegration3 = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction3, {});
        const productsResource = api.root.addResource("products");
        productsResource.addMethod("GET", lambdaIntegration);
        const productByIdResource = productsResource.addResource("{productId}");
        productByIdResource.addMethod("GET", lambdaIntegration2);
        const createProductResource = productsResource.addResource("create");
        createProductResource.addMethod("POST", lambdaIntegration3);
    }
}
exports.DeployLambdaAndApiService = DeployLambdaAndApiService;
class DeploySwaggerLambdaAndApiService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const lambdaFunction3 = new aws_cdk_lib_1.aws_lambda.Function(this, "swaggerUI", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'swaggerUI',
            handler: "swaggerHandler.handler",
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/swagger"))
        });
        const api = new aws_cdk_lib_1.aws_apigateway.RestApi(this, "swaggerApiGateWayPeer", {
            restApiName: "My API Gateway",
            description: "This API serves the Lambda functions"
        });
        const lambdaIntegration3 = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction3, {});
        const swaggerResource = api.root.addResource("swagger");
        swaggerResource.addMethod("GET", lambdaIntegration3);
    }
}
exports.DeploySwaggerLambdaAndApiService = DeploySwaggerLambdaAndApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLWFwaS1pbmZyYS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbWJkYS1hcGktaW5mcmEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkNBQWtHO0FBQ2xHLDJDQUF1QztBQUN2QyxnREFBd0I7QUFDeEIsOENBQThDO0FBRTlDLE1BQWEsMkJBQTRCLFNBQVEsbUJBQUs7SUFDcEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsbUJBQW1CO1FBQ25CLG9EQUFvRDtRQUNwRCxpREFBaUQ7UUFDakQsTUFBTTtRQUNOLElBQUkseUJBQXlCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUE7UUFFN0QsK0VBQStFO0lBQ2pGLENBQUM7Q0FDRjtBQWRELGtFQWNDO0FBSUQsTUFBYSx5QkFBMEIsU0FBUSxzQkFBUztJQUN0RCxZQUFZLEtBQWUsRUFBRSxFQUFTO1FBQ3BDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFaEIsTUFBTSxLQUFLLEdBQUcsMEJBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFbEYsTUFBTSxjQUFjLEdBQUcsSUFBSSx3QkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDckUsT0FBTyxFQUFFLHdCQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDdkMsVUFBVSxFQUFDLElBQUk7WUFDZixPQUFPLEVBQUMsc0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFlBQVksRUFBRSxnQkFBZ0I7WUFDOUIsT0FBTyxFQUFDLCtCQUErQjtZQUN2QyxJQUFJLEVBQUMsd0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FB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QUFXO1lBQ3RDLFVBQVUsRUFBQyxJQUFJO1lBQ2YsT0FBTyxFQUFDLHNCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixZQUFZLEVBQUUsV0FBVztZQUN6QixPQUFPLEVBQUMsd0JBQXdCO1lBQ2hDLElBQUksRUFBQyx3QkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztTQUNqRixDQUFDLENBQUE7UUFFRixNQUFNLEdBQUcsR0FBRyxJQUFJLDRCQUFjLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUNsRSxXQUFXLEVBQUMsZ0JBQWdCO1lBQzVCLFdBQVcsRUFBQyxzQ0FBc0M7U0FDckQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLDRCQUFjLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFdkQsQ0FBQztDQUdGO0FBM0JELDRFQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXdzX2FwaWdhdGV3YXksIGF3c19sYW1iZGEsIGF3c19keW5hbW9kYiwgRHVyYXRpb24sIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgTGFtYmRhQW5kQXBpRGVwbG95bWVudFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgLy8gZXhhbXBsZSByZXNvdXJjZVxuICAgIC8vIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnSW5mcmFRdWV1ZScsIHtcbiAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXG4gICAgLy8gfSk7XG4gICAgbmV3IERlcGxveUxhbWJkYUFuZEFwaVNlcnZpY2UodGhpcywgXCJsYW1iZGFBbmRBcGlEZXBsb3ltZW50XCIpXG5cbiAgICAvLyBuZXcgRGVwbG95U3dhZ2dlckxhbWJkYUFuZEFwaVNlcnZpY2UodGhpcywgXCJzd2FnZ2VyTGFtYmRhQW5kQXBpRGVwbG95bWVudFwiKSBcbiAgfVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIERlcGxveUxhbWJkYUFuZEFwaVNlcnZpY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTpDb25zdHJ1Y3QsIGlkOnN0cmluZyl7XG4gICAgc3VwZXIoc2NvcGUsIGlkKVxuXG4gICAgY29uc3QgdGFibGUgPSBhd3NfZHluYW1vZGIuVGFibGUuZnJvbVRhYmxlTmFtZSh0aGlzLCAnUHJvZHVjdHNUYWJsZScsICdwcm9kdWN0cycpO1xuXG4gICAgY29uc3QgbGFtYmRhRnVuY3Rpb24gPSBuZXcgYXdzX2xhbWJkYS5GdW5jdGlvbih0aGlzLCBcImdldFByb2R1Y3RMaXN0XCIsIHtcbiAgICAgIHJ1bnRpbWU6IGF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIG1lbW9yeVNpemU6MTAyNCxcbiAgICAgIHRpbWVvdXQ6RHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ2dldFByb2R1Y3RMaXN0JyxcbiAgICAgIGhhbmRsZXI6J2dldFByb2R1Y3RMaXN0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGNvZGU6YXdzX2xhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2Rpc3QvaGFuZGxlcnMvZ2V0UHJvZHVjdExpc3RcIikpXG4gICAgICBcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhbWJkYUZ1bmN0aW9uMiA9IG5ldyBhd3NfbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiZ2V0UHJvZHVjdHNCeUlkXCIsIHtcbiAgICAgIHJ1bnRpbWU6YXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgbWVtb3J5U2l6ZToxMDI0LFxuICAgICAgdGltZW91dDpEdXJhdGlvbi5zZWNvbmRzKDUpLFxuICAgICAgZnVuY3Rpb25OYW1lOiAnZ2V0UHJvZHVjdHNCeUlkJyxcbiAgICAgIGhhbmRsZXI6XCJnZXRQcm9kdWN0c0J5SWRIYW5kbGVyLmhhbmRsZXJcIixcbiAgICAgIGNvZGU6YXdzX2xhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2Rpc3QvaGFuZGxlcnMvZ2V0UHJvZHVjdHNCeUlkXCIpKVxuICAgIH0pXG5cbiAgICBjb25zdCBsYW1iZGFGdW5jdGlvbjMgPSBuZXcgYXdzX2xhbWJkYS5GdW5jdGlvbih0aGlzLCBcImNyZWF0ZVByb2R1Y3RcIiwge1xuICAgICAgcnVudGltZTogYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgbWVtb3J5U2l6ZToxMDI0LFxuICAgICAgdGltZW91dDpEdXJhdGlvbi5zZWNvbmRzKDUpLFxuICAgICAgZnVuY3Rpb25OYW1lOiAnY3JlYXRlUHJvZHVjdCcsXG4gICAgICBoYW5kbGVyOidjcmVhdGVQcm9kdWN0c0hhbmRsZXIuaGFuZGxlcicsXG4gICAgICBjb2RlOmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kaXN0L2hhbmRsZXJzL2NyZWF0ZVByb2R1Y3RzXCIpKVxuICAgICAgXG4gICAgfSk7XG5cbiAgICB0YWJsZS5ncmFudFJlYWRXcml0ZURhdGEobGFtYmRhRnVuY3Rpb24pO1xuICAgIHRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShsYW1iZGFGdW5jdGlvbjIpO1xuICAgIHRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShsYW1iZGFGdW5jdGlvbjMpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IGF3c19hcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJ0YXNrMkFwaUdhdGVXYXlQZWVyXCIsIHtcbiAgICAgICAgcmVzdEFwaU5hbWU6XCJNeSBBUEkgR2F0ZXdheVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcIlRoaXMgQVBJIHNlcnZlcyB0aGUgTGFtYmRhIGZ1bmN0aW9uc1wiXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFJbnRlZ3JhdGlvbiA9IG5ldyBhd3NfYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbiwge30pO1xuICAgIGNvbnN0IGxhbWJkYUludGVncmF0aW9uMiA9IG5ldyBhd3NfYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbjIsIHt9KTtcbiAgICBjb25zdCBsYW1iZGFJbnRlZ3JhdGlvbjMgPSBuZXcgYXdzX2FwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24zLCB7fSk7XG5cbiAgICBjb25zdCBwcm9kdWN0c1Jlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoXCJwcm9kdWN0c1wiKTtcbiAgICBwcm9kdWN0c1Jlc291cmNlLmFkZE1ldGhvZChcIkdFVFwiLCBsYW1iZGFJbnRlZ3JhdGlvbik7XG5cbiAgICBjb25zdCBwcm9kdWN0QnlJZFJlc291cmNlID0gcHJvZHVjdHNSZXNvdXJjZS5hZGRSZXNvdXJjZShcIntwcm9kdWN0SWR9XCIpO1xuICAgIHByb2R1Y3RCeUlkUmVzb3VyY2UuYWRkTWV0aG9kKFwiR0VUXCIsIGxhbWJkYUludGVncmF0aW9uMik7XG5cbiAgICBjb25zdCBjcmVhdGVQcm9kdWN0UmVzb3VyY2UgPSBwcm9kdWN0c1Jlc291cmNlLmFkZFJlc291cmNlKFwiY3JlYXRlXCIpO1xuICAgIGNyZWF0ZVByb2R1Y3RSZXNvdXJjZS5hZGRNZXRob2QoXCJQT1NUXCIsIGxhbWJkYUludGVncmF0aW9uMyk7XG5cbiAgfVxuXG5cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBEZXBsb3lTd2FnZ2VyTGFtYmRhQW5kQXBpU2VydmljZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOkNvbnN0cnVjdCwgaWQ6c3RyaW5nKXtcbiAgICBzdXBlcihzY29wZSwgaWQpXG5cblxuICAgIGNvbnN0IGxhbWJkYUZ1bmN0aW9uMyA9IG5ldyBhd3NfbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwic3dhZ2dlclVJXCIsIHtcbiAgICAgIHJ1bnRpbWU6YXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgbWVtb3J5U2l6ZToxMDI0LFxuICAgICAgdGltZW91dDpEdXJhdGlvbi5zZWNvbmRzKDUpLFxuICAgICAgZnVuY3Rpb25OYW1lOiAnc3dhZ2dlclVJJyxcbiAgICAgIGhhbmRsZXI6XCJzd2FnZ2VySGFuZGxlci5oYW5kbGVyXCIsXG4gICAgICBjb2RlOmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kaXN0L2hhbmRsZXJzL3N3YWdnZXJcIikpXG4gICAgfSlcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhd3NfYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsIFwic3dhZ2dlckFwaUdhdGVXYXlQZWVyXCIsIHtcbiAgICAgICAgcmVzdEFwaU5hbWU6XCJNeSBBUEkgR2F0ZXdheVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcIlRoaXMgQVBJIHNlcnZlcyB0aGUgTGFtYmRhIGZ1bmN0aW9uc1wiXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFJbnRlZ3JhdGlvbjMgPSBuZXcgYXdzX2FwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24zLCB7fSk7XG5cbiAgICBjb25zdCBzd2FnZ2VyUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcInN3YWdnZXJcIik7XG4gICAgc3dhZ2dlclJlc291cmNlLmFkZE1ldGhvZChcIkdFVFwiLCBsYW1iZGFJbnRlZ3JhdGlvbjMpO1xuXG4gIH1cblxuXG59XG5cbiJdfQ==