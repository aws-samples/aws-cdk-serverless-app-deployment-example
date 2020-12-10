## Serverless app deployment using AWS Cloud Development Kit (CDK)

In this demo, you will learn how to deploy a serverless application made AWS lambda, Amazon API Gateway, and Amazon Aurora Serverless using the AWS Cloud Development Kit, known as the CDK. For a more detailed step-by-step instructions you can follow this [blog](https://aws-preview.aka.amazon.com/blogs/devops/deploying-a-serverless-application-using-aws-cdk/)

## Architecture 

The architecture of this demo consists of AWS Cloud9 instance environment containing a CDK project which deploys an API Gateway and Lambda function. This Lambda function leverages a secret stored in your AWS Secrets Manager to read and write from your Aurora Serverless database through the data API, as shown in the following diagram.

<p align="left">
  <img width="600" height="300" src="https://github.com/aws-samples/aws-cdk-serverless-app-deployment-example/blob/master/img/cdk-serverless-app-deploy.png">
</p>

## Deployment instructions

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

`INSERT INTO singers(id,name,nationality,recordid) VALUES(100,'Michael Jackson','American',001);`

6. Test

Once it’s done, you can test it using Postman:

GET = ‘RecordName’ in the path

    example:
        API-GATEWAY ENDPOINT/RecordName

POST = Payload in the body

    example:
```yaml
  {
     "recordTitle" : "BlogTest",
     "recordReleaseDate" : "2020-01-01",
     "singerName" : "BlogSinger",
     "singerNationality" : "AWS"
  }
```
## License

This library is licensed under the MIT-0 License. See the LICENSE file.

