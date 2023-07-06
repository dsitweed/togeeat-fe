import {
  languageOptions,
  nationalityOptions,
} from "@/components/common/ChangeLanguage";
import { AuthContext } from "@/contexts/auth";
import { PlusOutlined } from "@ant-design/icons";
import { IconPlus } from "@tabler/icons-react";
import {
  App,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
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
  hobby: any[];
}

/**
 * Form cập nhật profile
 * @param
 * @returns
 */
function UserInfoForm({ isOpen, setIsOpen }: Props) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { user, fetchUserFromStorage } = useContext(AuthContext);
  const [form] = Form.useForm<IUserInfoForm>();
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | undefined>(user?.avatar);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onSubmit = async (values: IUserInfoForm) => {
    setLoading(true);
    const { hobby, ...sendValues } = values;
    const response = await axios.patch(`/users/user/update`, {
      ...sendValues,
      languageSkills: values.languageSkills.join(", "),
      avatar: imageUrl,
    });
    console.log(hobby);
    hobby?.map(async (item) => {
      await axios.patch(`/users/hobby/assign/${item}`);
    });

    if (response.success) {
      const userResponse = await axios.get(`/users/user/${user?.id}`);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      fetchUserFromStorage();
      notification.success({ message: t("auth.message.updateProfileSuccess") });
      handleCancel();
    } else {
      notification.error({ message: response.message });
    }
    setLoading(false);
  };

  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    await axios.post("/users/hobby", { name });
    const response = await axios.get("/users/hobby");
    setItems(response.data);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const load = async () => {
      const response = await axios.get("/users/hobby");
      setItems(response.data);
    };
    load();
  }, []);

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
          initialValues={
            user
              ? {
                  ...user,
                  languageSkills: user.languageSkills.split(", "),
                  hobby: user?.hobbies?.map((item) => item.hobbyId),
                }
              : undefined
          }
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          className="w-full"
        >
          <Form.Item label="Avatar">
            <Upload
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={async (option) => {
                var formData = new FormData();
                formData.append("image", option.file);

                const response = await axios.post("/file/image", formData, {
                  headers: {
                    "content-type":
                      "multipart/form-data; boundary=----WebKitFormBoundarylxPKmc0lTbNeKbx8",
                  },
                });
                setImageUrl(response.data.url);
              }}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-full"
                />
              ) : (
                <IconPlus />
              )}
            </Upload>
          </Form.Item>
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
              options={nationalityOptions}
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
          <Form.Item label={t("auth.form.hobby.label")} name="hobby">
            <Select
              mode="multiple"
              placeholder={t("auth.form.hobby.placeholder")}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      {t("common.button.ok")}
                    </Button>
                  </Space>
                </>
              )}
              options={items?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
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
