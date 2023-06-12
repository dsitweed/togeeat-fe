import StonksImage from "@/assets/images/stonks.jpg";
import UserProfilePopup from "@/components/bussiness/UserProfilePopup";
import { Avatar, Image, Space, Tooltip } from "antd";
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
          <Image preview={false} src={StonksImage} width={240} />
          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-semibold">{props.address}</p>
            <div>{t("matching.text.participant")}:</div>
            <Space size={[4, "small"]} wrap>
              {props.userMatchings.map((user) => (
                <Tooltip title={user.user.name} key={user.userId}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedUser(user.userId);
                    }}
                  >
                    <Avatar
                      src={user.user?.avatar || "/avatar.jpg"}
                      key={user.userId}
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
