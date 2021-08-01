const config = {
  cognito: {
    REGION: process.env.REGION,
    USER_POOL_ID: process.env.USER_POOL_ID,
    POOL_REGION: process.env.POOL_REGION,
    APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
  },
  // s3: {
  //   REGION: "ap-southeast-1",
  //   BUCKET: "prod-infrastructure-s3-xxx"
  // },
  // apiGateway: {
  //   REGION: "ap-southeast-1",
  //   URL: "https://xxx.execute-api.xxxd"
  // },
};

export default config;