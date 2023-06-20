import { ScheduleMatchingContext } from "@/contexts/scheduleMatching";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
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
  const [pos, setPos] = useState<{ lat: number; lng: number }>();
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
      lat: pos?.lat,
      long: pos?.lng,
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
      title={t("common.title.scheduleMatching")}
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
          label={t("matching.form.date.label")}
          name="matchingDate"
          className="w-full"
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={t("matching.form.date.placeholder")}
            className="w-full"
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

export default ScheduleMatchingForm;
