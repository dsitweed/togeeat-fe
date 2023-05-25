import UserReview from "@/pages/matching-history/components/UserReview";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserProfilePopup({ isOpen, setIsOpen }: Props) {
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
      <UserReview />
    </Modal>
  );
}

export default UserProfilePopup;
