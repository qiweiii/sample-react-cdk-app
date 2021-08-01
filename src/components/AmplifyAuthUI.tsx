import React from 'react';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';


const AmplifyAuthUI = () => {

  const handleAuthStateChange = (state: string) => {
    console.log("current state: " + state);
  }

  const signUpConfig = {
    signUpFields: [{
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      placeholder: 'Phone Number',
      required: true,
      displayOrder: 3,
    }],
  };

  return (
    <div>
      {/* <AmplifySignOut /> */}
      <Authenticator hideDefault={true} onStateChange={handleAuthStateChange}>
        <SignUp signUpConfig={signUpConfig} />
        <ConfirmSignUp />
        <SignIn />
        <Greetings />
      </Authenticator>
    </div>
  )
};

export default AmplifyAuthUI;