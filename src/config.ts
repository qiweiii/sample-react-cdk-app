const config = {
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    POOL_REGION: process.env.REACT_APP_POOL_REGION,
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
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