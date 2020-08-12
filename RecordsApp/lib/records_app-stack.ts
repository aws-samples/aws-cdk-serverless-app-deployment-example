import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ssm from '@aws-cdk/aws-ssm';
import * as secretsManager from '@aws-cdk/aws-secretsmanager';

export class RecordsAppStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);
    
    const databaseUsername = 'adminuser';

    const databaseCredentialsSecret = new secretsManager.Secret(this, 'DBCredentialsSecret', {
      secretName: `aurora-serverless-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: databaseUsername,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    new ssm.StringParameter(this, 'DBCredentialsArn', {
      parameterName: `aurora-serverless-credentials-arn`,
      stringValue: databaseCredentialsSecret.secretArn,
    });

    const dbConfig = {
      dbClusterIdentifier: `main-aurora-serverless-cluster`,
      engineMode: 'serverless',
      engine: 'aurora-postgresql',
      engineVersion: '10.7',
      enableHttpEndpoint: true,
      databaseName: 'main',
      masterUsername: 'adminuser',
      masterUserPassword: databaseCredentialsSecret.secretValueFromJson('password').toString(),
      backupRetentionPeriod: 1,
      finalSnapshotIdentifier: `main-aurora-serverless-snapshot`,
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: 4,
        minCapacity: 2,
        secondsUntilAutoPause: 3600,
      }
    };

    const rdsCluster = new rds.CfnDBCluster(this, 'DBCluster', dbConfig);

    const dbClusterArn = `arn:aws:rds:${this.region}:${this.account}:cluster:${rdsCluster.ref}`;

    new ssm.StringParameter(this, 'DBResourceArn', {
      parameterName: `aurora-serverless-resource-arn`,
      stringValue: dbClusterArn,
    });
    
    
    const lambdaRole = new iam.Role(this, 'AuroraServerlessBlogLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSDataFullAccess'),
            iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
        ]
    });

    const handler = new lambda.Function(this, "RecordsHandler", {
     role: lambdaRole,
     runtime: lambda.Runtime.NODEJS_12_X, // So we can use async in widget.js
     code: lambda.Code.asset("resources"),
     handler: "records.main",
     environment: {
       TABLE: dbClusterArn,
       TABLESECRET: databaseCredentialsSecret.secretArn,
       DATABASE: "recordstore"
     }
   });
    
    const api = new apigateway.RestApi(this, "records-api", {
      restApiName: "Records Service",
      description: "This service serves records."
   });

    const getRecordsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": 200 }' }
    });

    api.root.addMethod("GET", getRecordsIntegration); // GET /

    const record = api.root.addResource("{id}");
    const postRecordIntegration = new apigateway.LambdaIntegration(handler);
    const getRecordIntegration = new apigateway.LambdaIntegration(handler);

    record.addMethod("POST", postRecordIntegration); // POST /{id}
    record.addMethod("GET", getRecordIntegration); // GET/{id}
  }
}