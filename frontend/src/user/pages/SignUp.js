import React from 'react';
import { Form, Button, Input } from '../../shared/components/Form';

const SignUp = () => {
  return (
    <div className="p-14">
      <Form>
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Sign In</Button>
      </Form>
    </div>
  );
};

export default SignUp;
