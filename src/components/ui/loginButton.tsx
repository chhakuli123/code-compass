// components/LoginButton.js
import { signIn } from 'next-auth/react';

import { Button } from './button';

function LoginButton() {
  return (
    <Button color="gradient" onClick={() => signIn('github')}>
      Sign in with GitHub
    </Button>
  );
}

export default LoginButton;
