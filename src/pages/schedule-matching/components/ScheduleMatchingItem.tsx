import { Avatar, Button, Image, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import UserProfilePopup from "./UserProfilePopup";
import { IMatching } from "../interfaces";

type Props = {} & IMatching;

function ScheduleMatchingItem(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = dayjs(props.matchingDate).format("YYYY/MM/DD HH:mm");
  return (
    <div className="flex flex-row justify-between p-4 bg-white rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row gap-6">
          <Image src="/not-stonks.jpeg" width={240} />
          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-semibold">{props.address}</p>
            <div>Matching with:</div>
            <Space size={[4, "small"]} wrap>
              <Tooltip title={"Stonks"}>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Avatar size={48} src={"/avatar.png"} />
                </div>
              </Tooltip>
            </Space>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            Time: {time} ({dayjs(time, "YYYY/MM/DD HH:mm").from(Date.now())})
          </p>
        </div>
      </div>
      <Tooltip title="Cancel" placement="bottom">
        <Button size="large" danger type="primary">
          {"Cancel"}
        </Button>
      </Tooltip>
      <UserProfilePopup
        userInfo={props.owner}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
}

export default ScheduleMatchingItem;
