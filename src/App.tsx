import React from 'react';
import './App.css';
import { AmplifyAuthContainer, AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

interface IUser {
  username?: string
}

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<IUser | undefined>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthContainer>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Custom Email Label",
              placeholder: "Custom email placeholder",
              inputProps: { required: true, autocomplete: "username" },
            },
            {
              type: "password",
              label: "Custom Password Label",
              placeholder: "Custom password placeholder",
              inputProps: { required: true, autocomplete: "new-password" },
            },
            {
              type: "phone_number",
              label: "Custom Phone Label",
              placeholder: "Custom phone placeholder",
            },
          ]}
        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>
    </AmplifyAuthContainer>
  );
}

export default AuthStateApp;