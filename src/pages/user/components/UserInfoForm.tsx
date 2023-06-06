import { App, Button, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserInfoForm({ isOpen, setIsOpen }: Props) {
  const { notification } = App.useApp();

  const [name, setName] = useState("");
  const [age, setAge] = useState<number>();
  const [description, setDescription] = useState("");
  const [avatar, _setAvatar] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  );
  const [phone, setPhone] = useState("");
  const [backgroundImage, _setBackgroundImage] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  );
  const [address, _setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [languageSkills, setLanguageSkills] = useState("");
  const [isPublic, _setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "");
    const accountId = currentUser.id;
    setLoading(true);
    const response = await axios.post("/users", {
      accountId,
      name,
      age,
      description,
      avatar,
      phone,
      backgroundImage,
      address,
      nationality,
      languageSkills,
      isPublic,
    });
    if (response.success) {
      notification.success({ message: "Update profile success" });
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
        title="User Info"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" className="w-full">
          <Form.Item label="Name" name="name">
            <Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter name"
            />
          </Form.Item>
          <Form.Item label="age" name="age">
            <InputNumber
              value={age}
              onChange={(e) => e && setAge(e)}
              placeholder="Enter age"
            />
          </Form.Item>
          <Form.Item label="description" name="description">
            <Input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Enter description"
            />
          </Form.Item>
          <Form.Item label="phone" name="phone">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              placeholder="Enter phone"
            />
          </Form.Item>
          <Form.Item label="nationality" name="nationality">
            <Input
              value={nationality}
              onChange={(e) => setNationality(e.currentTarget.value)}
              placeholder="Enter nationality"
            />
          </Form.Item>
          <Form.Item label="languageSkills" name="languageSkills">
            <Input
              value={languageSkills}
              onChange={(e) => setLanguageSkills(e.currentTarget.value)}
              placeholder="Enter languageSkills"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              className="w-full"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserInfoForm;
