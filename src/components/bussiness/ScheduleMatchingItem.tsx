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
