## My Project

TODO: Fill this README out!

Be sure to:

* Change the title in this README
* Edit your repository description on GitHub

Luis's changes 


## deployment instructions

1. Clone repo

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

.....

6. Test

.....

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

