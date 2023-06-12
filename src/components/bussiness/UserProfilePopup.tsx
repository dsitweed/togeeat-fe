import UserReview from "@/components/bussiness/UserReview";
import { Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

function UserProfilePopup({ isOpen, setIsOpen, userId }: Props) {
  const [userInfo, setUserInfo] = useState<Response.IUser>();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const load = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/user/${userId}`);
      if (response.success) {
        setUserInfo(response.data);
      }
      console.log(response);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setIsOpen(isOpen);

    return () => {};
  }, [isOpen]);

  return (
    <Modal
      width={"640"}
      title="User profile"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {loading ? <Skeleton /> : userInfo && <UserReview {...userInfo} />}
    </Modal>
  );
}

export default UserProfilePopup;
