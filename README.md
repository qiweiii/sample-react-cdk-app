
The React app is currently deployed here: https://main.d2mwro2ekf97im.amplifyapp.com/

## Prerequisite

- Node
- aws account
- aws cli local setup
- aws-cdk local setup
- aws-amplify local setup
- Save github access token as "github_access_token" in aws secrets manager

## Run app locally

```sh
yarn install
yarn start
```

## Build React app

```sh
yarn build
```

## Deploy infrastructure

```sh
cd infra
npm run build
cdk deploy
```

## Useful links

- [deploying-a-static-website-with-aws-amplify-and-cdk](https://aws.amazon.com/blogs/mobile/deploying-a-static-website-with-aws-amplify-and-cdk/)
- [cognito-cdk-amplify](https://github.com/drewword/https://github.com/drewword/cognito-cdk-amplify)
- [amazon-cognito-example-for-external-idp](https://github.com/aws-samples/amazon-cognito-example-for-external-idp)
- [Amplify auth with existingresource](https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource)
- [Amplify local setup](https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions)
- [Customize Amplify auth react component](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#custom-form-fields)