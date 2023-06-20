import UserProfilePopup from "@/components/bussiness/UserProfilePopup";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Avatar, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {} & Response.IScheduleMatching;

function ScheduleMatchingItem(props: Props) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();

  const time = dayjs(props.matchingDate).format("YYYY/MM/DD HH:mm");
  return (
    <div className="flex flex-row justify-between p-4 bg-white rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row gap-6">
          <GoogleMap
            mapContainerStyle={{ width: 240, height: 160 }}
            center={{ lat: props.lat, lng: props.long }}
            zoom={15}
          >
            <MarkerF position={{ lat: props.lat, lng: props.long }} />
          </GoogleMap>
          {/* <Image preview={false} src={StonksImage} width={240} /> */}
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.5163583264534!2d105.8445778242964!3d21.002423480742486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adb4871c8657%3A0xf8ed43d02a44ae39!2sCLB%20Bi-A%20B%C3%A1ch%20Khoa!5e0!3m2!1sen!2s!4v1687273558026!5m2!1sen!2s"
            width="240"
            height="160"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe> */}
          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-semibold">{props.address}</p>
            <div>{t("matching.text.participant")}:</div>
            <Space size={[4, "small"]} wrap>
              {props.userMatchings.map((user) => (
                <Tooltip title={user.user.name} key={user.user.id}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedUser(user.user.id);
                    }}
                  >
                    <Avatar
                      src={user.user?.avatar || "/avatar.jpg"}
                      key={user.user.id}
                    />
                  </div>
                </Tooltip>
              ))}
            </Space>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            {t("matching.text.time")}: {time} (
            {dayjs(time, "YYYY/MM/DD HH:mm").from(Date.now())})
          </p>
        </div>
      </div>
      {selectedUser && (
        <UserProfilePopup
          userId={selectedUser}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default ScheduleMatchingItem;
