import { App, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post("/auth/signup", { email, password });
    if (response.success) {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      notification.success({ message: "Sign up success" });
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center px-4 pt-2 gap-4">
      <p className="text-4xl font-semibold">Sign Up</p>
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
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <span className="text-sm flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/auth/sign-in"} className="!text-primary font-semibold">
          Sign in now!
        </Link>
      </span>
    </div>
  );
}

export default SignUp;
