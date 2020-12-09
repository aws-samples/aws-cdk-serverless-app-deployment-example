## Serverless app deployment using AWS Cloud Development Kit (CDK)

In this demo, you will learn how to deploy a serverless application made AWS lambda, Amazon API Gateway, and Amazon Aurora Serverless using the AWS Cloud Development Kit, known as the CDK.

## deployment instructions

1. Clone repo and navigate to directory using the following commands:

`git clone https://github.com/aws-samples/aws-cdk-serverless-app-deployment-example.git`

`cd aws-cdk-serverless-app-deployment-example/RecordsApp`

2. Configure cdk

`sudo yum -y update `

`nvm install v10.3.0; nvm alias default 10.3.0`

`npm install -g typescript`

`npm install -g aws-cdk`

`cdk init app --language typescript`


3. Install depedencies

`npm install @aws-cdk/aws-apigateway @aws-cdk/aws-lambda @aws-cdk/aws-iam @aws-cdk/aws-rds @aws-cdk/aws-aws-secretsmanager`

4. Cdk deploy

` npm run build; cdk synth; cdk bootstrap; cdk deploy `

5. Populate db and table


DATABASE NAME : main
SECRETS MANAGER: find it in the lambda function environment variables
.....

6. Test

.....

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

