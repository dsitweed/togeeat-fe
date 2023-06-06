import { App, Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { QuickMatchingContext } from "../contexts";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuickMatchingForm({ isOpen, setIsOpen }: Props) {
  const { notification } = App.useApp();
  const { fetchMatchingList } = useContext(QuickMatchingContext);

  const [address, setAddress] = useState("");
  const [desiredFood, setDesiredFood] = useState("");
  const [conversationTopics, setConversationTopics] = useState("");
  const matchingType = "QUICK";
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post("/matching", {
      address,
      desiredFood,
      conversationTopics,
      matchingDate: dayjs().add(duration, "minute"),
      matchingType,
    });
    if (response.success) {
      await fetchMatchingList();
      notification.success({ message: "Create matching success" });
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
    <Modal
      title="Matching Schedule"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" className="w-full">
        <Form.Item label="date" name="date">
          <InputNumber
            value={duration}
            onChange={(e) => e && setDuration(e)}
            placeholder="Enter duration(minute)"
          />
        </Form.Item>
        <Form.Item label="desiredFood" name="desiredFood">
          <Input
            value={desiredFood}
            onChange={(e) => setDesiredFood(e.currentTarget.value)}
            placeholder="Enter desiredFood"
          />
        </Form.Item>
        <Form.Item label="conversationTopics" name="conversationTopics">
          <Input
            value={conversationTopics}
            onChange={(e) => setConversationTopics(e.currentTarget.value)}
            placeholder="Enter conversationTopics"
          />
        </Form.Item>
        <Form.Item label="address" name="address">
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Enter address"
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
  );
}

export default QuickMatchingForm;
