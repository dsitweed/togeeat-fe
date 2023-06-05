import { App, Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post("/auth/signin", { email, password });
    if (response.success) {
      console.log("??");

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      notification.success({ message: "Sign in success" });
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center px-4 pt-2 gap-4">
      <p className="text-4xl font-semibold">Sign In</p>
      <Form layout="vertical" className="w-full">
        <Form.Item label="Email" name="email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter email"
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            className="w-full"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <span className="text-sm flex gap-2">
        <p>Don't have an account?</p>
        <Link to={"/auth/sign-up"} className="!text-primary font-semibold">
          Create one!
        </Link>
      </span>
    </div>
  );
}

export default SignIn;
