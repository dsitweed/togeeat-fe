import { MatchingHistoryContext } from "@/contexts/matchingHistory";
import { QuickMatchingContext } from "@/contexts/quickMatching";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { App, Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IQuickMatchingForm {
  address: string;
  desiredFood: string;
  conversationTopics: string;
  duration: number;
}

function QuickMatchingForm({ isOpen, setIsOpen }: Props) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { fetchMatchingList } = useContext(QuickMatchingContext);
  const { fetchReviewList } = useContext(MatchingHistoryContext);
  const matchingType = "QUICK";
  const [form] = Form.useForm<IQuickMatchingForm>();
  const [pos, setPos] = useState<{ lat: number; lng: number }>();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = async (values: IQuickMatchingForm) => {
    setLoading(true);
    const { duration, ...sendValues } = values;
    const matchingDate = dayjs().add(duration, "minute");
    const response = await axios.post("/matching", {
      ...sendValues,
      duration,
      matchingDate,
      matchingType,
      lat: pos?.lat,
      long: pos?.lng,
    });
    if (response.success) {
      await fetchReviewList();
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPos(pos);
      });
    }
  }, []);

  return (
    <Modal
      title={t("common.title.quickMatching")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={640}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className="w-full"
      >
        <Form.Item
          label={t("matching.form.duration.label")}
          name="duration"
          rules={[{ required: true }]}
        >
          <Select
            options={[30, 45, 60].map((item) => ({
              label: `${item} ${t("misc.minute")}`,
              value: item,
            }))}
            className="w-full"
            placeholder={t("matching.form.duration.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("matching.form.desiredFood.label")}
          name="desiredFood"
          rules={[{ required: true }]}
        >
          <Input placeholder={t("matching.form.desiredFood.placeholder")} />
        </Form.Item>
        <Form.Item
          label={t("matching.form.conversationTopics.label")}
          name="conversationTopics"
          rules={[{ required: true }]}
        >
          <Input
            placeholder={t("matching.form.conversationTopics.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("matching.form.address.label")}
          name="address"
          rules={[{ required: true }]}
        >
          <Input placeholder={t("matching.form.address.placeholder")} />
        </Form.Item>
        <Form.Item>
          {pos ? (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              center={pos}
              zoom={15}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <MarkerF
                draggable
                position={pos}
                onDragEnd={(e) => {
                  e.latLng &&
                    setPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }}
              />
            </GoogleMap>
          ) : null}
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

export default QuickMatchingForm;
