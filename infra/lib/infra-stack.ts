import * as cdk from '@aws-cdk/core';
import * as amplify from "@aws-cdk/aws-amplify";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define Amplify
    const amplifyApp = new amplify.App(this, "sample-react-cdk-app ", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "qiweiii",
        repository: "sample-react-cdk-app",
        oauthToken: cdk.SecretValue.secretsManager("sample-react-cdk-app-github", {
          jsonField: "github_access_token", 
          // note: i set github_access_token on github to expire in 90 days, 
          // so rmb to re-create it and add to aws later on
        }),
      }),
    });
    const masterBranch = amplifyApp.addBranch("main");
  }
}
