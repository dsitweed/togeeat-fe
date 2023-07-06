import UserReview from "@/components/bussiness/UserReview";
import { Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

function UserProfilePopup({ isOpen, setIsOpen, userId }: Props) {
  const { t } = useTranslation();
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
      const response = await axios.get(`/users/user/${userId}`);
      if (response.success) {
        setUserInfo(response.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [userId]);

  useEffect(() => {
    setIsOpen(isOpen);

    return () => {};
  }, [isOpen]);

  return (
    <Modal
      width={"640"}
      title={t("common.title.userInfo")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {loading ? <Skeleton /> : userInfo && <UserReview {...userInfo} />}
    </Modal>
  );
}

export default UserProfilePopup;
