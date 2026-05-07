import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class LambdaAndApiDeploymentStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps);
}
export declare class DeployLambdaAndApiService extends Construct {
    constructor(scope: Construct, id: string);
}
export declare class DeploySwaggerLambdaAndApiService extends Construct {
    constructor(scope: Construct, id: string);
}
