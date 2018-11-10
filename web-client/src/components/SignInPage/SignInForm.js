import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

import { InlineError } from "@/components/common";

const SignInForm = ({
  handleLogin,
  onChange,
  error,
  redirectToRegister,
  clientErrors,
  credentials
}) => (
  <Form className="signin-form">
    <Form.Item>
      <label htmlFor="username">Username</label>
      {clientErrors.username && <InlineError text={clientErrors.username} />}
      <Input
        prefix={<Icon type="user" />}
        type="text"
        name="username"
        value={credentials.username}
        className=""
        onChange={onChange}
        placeholder="username"
        size="large"
      />
    </Form.Item>
    <Form.Item>
      <label htmlFor="password">Password</label>
      {clientErrors.password && <InlineError text={clientErrors.password} />}
      <Input
        prefix={<Icon type="lock" />}
        type="password"
        name="password"
        value={credentials.password}
        className="validate"
        onChange={onChange}
        placeholder="password"
        size="large"
      />
    </Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleLogin}
    >
      Log In
    </Button>
    <br /> <br />
    New to Today's News? <a onClick={redirectToRegister}>Register</a>
    <br /> <br />
    {error && <InlineError text={error} />}
  </Form>
);

SignInForm.propTypes = {
  error: PropTypes.string.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default SignInForm;
