import UserReview from "@/pages/matching-history/components/UserReview";
import { IUserInfo } from "@/pages/user/interfaces";
import { Modal } from "antd";
import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUserInfo;
};

function UserProfilePopup({ isOpen, setIsOpen, userInfo }: Props) {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

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
      <UserReview {...userInfo} />
    </Modal>
  );
}

export default UserProfilePopup;
