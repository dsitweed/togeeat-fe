import { ScheduleMatchingContext } from "@/contexts/scheduleMatching";
import { App, Button, DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IScheduleMatchingForm {
  address: string;
  desiredFood: string;
  conversationTopics: string;
  matchingDate: Date;
}

function ScheduleMatchingForm({ isOpen, setIsOpen }: Props) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { fetchMatchingList } = useContext(ScheduleMatchingContext);

  const matchingType = "YOTEI";
  const [form] = Form.useForm<IScheduleMatchingForm>();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = async (values: IScheduleMatchingForm) => {
    setLoading(true);
    const response = await axios.post("/matching", {
      ...values,
      matchingType,
    });
    if (response.success) {
      await fetchMatchingList();
      notification.success({
        message: t("matching.text.createMatchingSuccess"),
      });
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
      title={t("common.title.scheduleMatching")}
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
        <Form.Item label={t("matching.form.date.label")} name="date">
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={t("matching.form.date.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("matching.form.desiredFood.label")}
          name="desiredFood"
        >
          <Input placeholder={t("matching.form.desiredFood.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("matching.form.conversationTopics.label")}
          name="conversationTopics"
        >
          <Input
            placeholder={t("matching.form.conversationTopics.placeholder")}
          />
        </Form.Item>
        <Form.Item label={t("matching.form.address.label")} name="address">
          <Input placeholder={t("matching.form.address.placeholder")} />
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
  );
}

export default ScheduleMatchingForm;
