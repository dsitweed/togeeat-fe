import { languageOptions } from "@/components/common/ChangeLanguage";
import { App, Button, Form, Input, InputNumber, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IUserInfoForm {
  age: number;
  name: string;
  description: string;
  phone: string;
  address: string;
  nationality: string;
  languageSkills: string[];
}

function UserInfoForm({ isOpen, setIsOpen }: Props) {
  const { t } = useTranslation();
  const { notification } = App.useApp();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = async (values: IUserInfoForm) => {
    setLoading(true);
    const currentUser = JSON.parse(localStorage.getItem("user") || "");
    const accountId = currentUser.id;
    const response = await axios.patch("/users", {
      ...values,
      languageSkills: values.languageSkills.join(", "),
      accountId,
    });
    if (response.success) {
      notification.success({ message: t("auth.message.updateProfileSuccess") });
      handleCancel();
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsOpen(isOpen);

    return () => {};
  }, [isOpen]);
  return (
    <div>
      <Modal
        title={t("common.title.userInfo")}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          className="w-full"
        >
          <Form.Item label={t("auth.form.name.label")} name="name">
            <Input placeholder={t("auth.form.name.placeholder")} />
          </Form.Item>
          <Form.Item label={t("auth.form.age.label")} name="age">
            <InputNumber
              min={18}
              placeholder={t("auth.form.age.placeholder")}
              className="w-full"
            />
          </Form.Item>
          <Form.Item label={t("auth.form.phone.label")} name="phone">
            <Input placeholder={t("auth.form.phone.placeholder")} />
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
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              className="w-full"
              htmlType="submit"
            >
              {t("common.button.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserInfoForm;
