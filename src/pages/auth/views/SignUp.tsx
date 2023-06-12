import { languageOptions } from "@/components/common/ChangeLanguage";
import { AuthContext } from "@/contexts/auth";
import { App, Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface ISignUpForm {
  email: string;
  password: string;
  // Profile
  age: number;
  name: string;
  description: string;
  phone: string;
  address: string;
  nationality: string;
  languageSkills: string[];
}

function SignUp() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { fetchUserFromStorage } = useContext(AuthContext);

  const [form] = Form.useForm<ISignUpForm>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ISignUpForm) => {
    setLoading(true);
    const response = await axios.post("/auth/signup", {
      ...values,
      languageSkills: values.languageSkills.join(", "),
    });
    if (response.success) {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.account.user));
      fetchUserFromStorage();
      navigate("/");
      notification.success({ message: t("auth.message.signUpSuccess") });
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:min-w-[400px] items-center px-4 pt-2 gap-4">
      <p className="text-4xl font-semibold">{t("auth.action.signUp")}</p>
      <Form
        form={form}
        onFinish={onSubmit}
        requiredMark={false}
        layout="vertical"
        className="w-full"
        // rootClassName="grid lg:grid-cols-2"
      >
        <Form.Item
          label={t("auth.form.name.label")}
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder={t("auth.form.name.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("auth.form.email.label")}
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder={t("auth.form.email.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("auth.form.phone.label")}
          name="phone"
          rules={[{ required: true }]}
        >
          <Input placeholder={t("auth.form.phone.placeholder")} />
        </Form.Item>
        <div className="grid lg:grid-cols-2 gap-x-2">
          <Form.Item
            label={t("auth.form.age.label")}
            name="age"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber
              min={18}
              placeholder={t("auth.form.age.placeholder")}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label={t("auth.form.nationality.label")}
            name="nationality"
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t("auth.form.nationality.placeholder")}
              className="w-full"
              options={languageOptions}
            />
          </Form.Item>
        </div>
        <Form.Item
          label={t("auth.form.languageSkills.label")}
          name="languageSkills"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            placeholder={t("auth.form.languageSkills.placeholder")}
            className="w-full"
            options={languageOptions}
          />
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
            loading={loading}
            htmlType="submit"
            type="primary"
            className="w-full"
          >
            {t("auth.action.signUp")}
          </Button>
        </Form.Item>
      </Form>
      <span className="text-sm flex gap-2">
        <p>{t("auth.text.alreadyHaveAccount")}</p>
        <Link to={"/auth/sign-in"} className="!text-primary font-semibold">
          {t("auth.text.signInNow")}
        </Link>
      </span>
    </div>
  );
}

export default SignUp;
