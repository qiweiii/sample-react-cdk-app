import * as cdk from '@aws-cdk/core';
import * as amplify from "@aws-cdk/aws-amplify";
import * as cognito from '@aws-cdk/aws-cognito';
import { CfnOutput } from '@aws-cdk/core';
import * as iam from "@aws-cdk/aws-iam";


export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // ========================================================================
    // Resource: Amplify App
    // ========================================================================

    // Purpose: creates an amplify frontend app
    
    // See also:
    // - https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html

    const amplifyApp = new amplify.App(this, "sample-react-cdk-app ", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "qiweiii",
        repository: "sample-react-cdk-app",
        oauthToken: cdk.SecretValue.secretsManager("sample-react-cdk-app-github", {
          jsonField: "github_access_token", 
          // note: i set github_access_token on github to expire in 90 days, 
          // so rmb to re-create it and add to aws secretsManager again later on
        }),
      }),
    });
    const masterBranch = amplifyApp.addBranch("main");


    // ========================================================================
    // Resource: Amazon Cognito User Pool
    // ========================================================================

    // Purpose: creates a user directory and allows federation from external IdPs

    // See also:
    // - https://aws.amazon.com/cognito/
    // - https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-cognito.CfnIdentityPool.html

    // high level construct
    const userPool: cognito.UserPool = new cognito.UserPool(this, id + "srca-UserPool", {
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias
    });

    // any properties that are not part of the high level construct can be added using this method
    const userPoolCfn = userPool.node.defaultChild as cognito.CfnUserPool;
    userPoolCfn.userPoolAddOns = { advancedSecurityMode: "ENFORCED" }
    userPoolCfn.schema = [{
      name: "userPool",
      attributeDataType: "String",
      mutable: true,
      required: false,
      stringAttributeConstraints: {
        maxLength: "2000"
      }
    }];

    // create two groups, one for admins one for users
    // these groups can be used without configuring a 3rd party IdP
    new cognito.CfnUserPoolGroup(this, "srca-AdminsGroup", {
      groupName: 'admin',
      userPoolId: userPool.userPoolId,
    });

    new cognito.CfnUserPoolGroup(this, "srca-UsersGroup", {
      groupName: 'users',
      userPoolId: userPool.userPoolId,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "srca-UserPoolClient", {
      userPool,
      generateSecret: false, // Don't need to generate secret for web app running on browsers
    });


    // ========================================================================
    // Resource: Amazon Cognito Identity Pool
    // ========================================================================

    // Purpose: provide temporary AWS credentials for users who are guests (unauthenticated)
    // and for users who have been authenticated and received a token.
    // - https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html
    
    const identityPool = new cognito.CfnIdentityPool(this, "srca-IdentityPool", {
      allowUnauthenticatedIdentities: false, // Don't allow unathenticated users
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    
    // Export values
    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "IdentityPoolId", {
      value: identityPool.ref,
    });
  }
}
