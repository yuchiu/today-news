import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

import { InlineError } from "@/components/common";

const SignUpForm = ({
  handleRegister,
  onChange,
  redirectToLogin,
  clientErrors,
  error,
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
      <label htmlFor="email">Email</label>
      {clientErrors.email && <InlineError text={clientErrors.email} />}
      <Input
        prefix={<Icon type="mail" />}
        type="email"
        name="email"
        value={credentials.email}
        className=""
        onChange={onChange}
        placeholder="email"
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
    <Form.Item>
      <label htmlFor="confirm_password">Confirm Password</label>
      {clientErrors.confirmPassword && (
        <InlineError text={clientErrors.confirmPassword} />
      )}
      <Input
        prefix={<Icon type="lock" />}
        type="password"
        name="confirmPassword"
        value={credentials.confirmPassword}
        className="validate"
        onChange={onChange}
        placeholder="confirm password"
        size="large"
      />
    </Form.Item>
    <Button
      type="default"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleRegister}
    >
      Register
    </Button>
    <br /> <br />
    Already have an account? <a onClick={redirectToLogin}>Log In</a>
    <br /> <br />
    {error && <InlineError text={error} />}
  </Form>
);

SignUpForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  clientErrors: PropTypes.object.isRequired,

  handleRegister: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SignUpForm;
