import { AuthContext } from "@/contexts/auth";
import { App, Button, Form, Input } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface ISignInForm {
  email: string;
  password: string;
}

function SignIn() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { fetchUserFromStorage } = useContext(AuthContext);

  const [form] = Form.useForm<ISignInForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ISignInForm) => {
    setLoading(true);
    const response = await axios.post("/auth/signin", values);
    if (response.success) {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.account.user));
      fetchUserFromStorage();
      navigate("/");
      notification.success({ message: t("auth.message.signInSuccess") });
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:min-w-[400px] items-center px-4 pt-2 gap-4">
      <p className="text-4xl font-semibold">{t("auth.action.signIn")}</p>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className="w-full"
        requiredMark={false}
      >
        <Form.Item
          label={t("auth.form.email.label")}
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder={t("auth.form.email.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("auth.form.password.label")}
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder={t("auth.form.password.placeholder")} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            className="w-full"
          >
            {t("auth.action.signIn")}
          </Button>
        </Form.Item>
      </Form>
      <span className="text-sm flex gap-2">
        <p>{t("auth.text.doNotHaveAccount")}</p>
        <Link to={"/auth/sign-up"} className="!text-primary font-semibold">
          {t("auth.text.createNewAccount")}
        </Link>
      </span>
    </div>
  );
}

export default SignIn;
