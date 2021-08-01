import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <div>
    <AmplifySignOut />
  </div>
);

export default withAuthenticator(App);