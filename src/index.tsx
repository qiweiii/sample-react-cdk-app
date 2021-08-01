import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth } from 'aws-amplify';
import config from './config';


Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: config.cognito.IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: config.cognito.REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: config.cognito.POOL_REGION,
    
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.cognito.USER_POOL_ID,
    
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  }
  // Easily connect to more aws resources
  // Storage: {
  //   region: config.s3.REGION,
  //   bucket: config.s3.BUCKET,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID
  // },
  // API: {
  //   endpoints: [
  //     {
  //       name: "api",
  //       endpoint: config.apiGateway.URL,
  //       region: config.apiGateway.REGION
  //     },
  //   ]
  // }
});

const currentConfig = Auth.configure(
  {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: config.cognito.IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: config.cognito.REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: config.cognito.POOL_REGION,
    
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.cognito.USER_POOL_ID,
    
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  }
);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
