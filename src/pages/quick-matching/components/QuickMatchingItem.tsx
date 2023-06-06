import NotStonksImage from "@/assets/images/not-stonks.jpeg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Space, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IQuickMatching } from "../interfaces";
import axios from "axios";

type Props = {} & IQuickMatching;

function QuickMatchingItem(props: Props) {
  const [isJoined, setIsJoined] = useState(false);
  const [_now, setNow] = useState(Date.now());
  const time = dayjs(props.matchingDate).format("HH:mm");

  const remain = dayjs(time, "HH:mm").diff(Date.now(), "minute");

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function toggleIsJoined() {
    if (isJoined) {
      setIsJoined(false);
      await axios.patch(`/matching/leave/${props.id}`);
    } else {
      await axios.patch(`/matching/join/${props.id}`);
      setIsJoined(true);
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
      <div className="-m-4">
        <Image src={NotStonksImage} alt="" />
      </div>
      <div className="inline-flex items-center justify-between pt-4 text-2xl font-semibold">
        {props.address}
        {isJoined && (
          <Tag color="green" className="px-2 py-1">
            Joined
          </Tag>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <Avatar size={56} src={"/avatar.png"} />
          <div className="flex flex-col">
            <p>Host: {props.ownerId}</p>
            <div className="inline-flex">
              <p className="mr-2">Favorite</p>
              <Space size={[0, "small"]} wrap>
                <Tag color="blue">Soccer</Tag>
                <Tag color="blue">Chess</Tag>
              </Space>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p>Time: {time}</p>
          {remain >= 0 ? (
            <p>{remain} min left</p>
          ) : (
            <Tag color="red" className="mr-0">
              Expired
            </Tag>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>Participants: {3}</p>
          <Avatar.Group>
            <Avatar src={"/avatar.png"} />
            <Avatar src={"/avatar.png"} />
            <Avatar src={"/avatar.png"} />
          </Avatar.Group>
        </div>
        <Button
          disabled={remain < 0}
          type={"primary"}
          danger={isJoined}
          size="large"
          onClick={toggleIsJoined}
        >
          {isJoined ? (
            <div className="inline-flex items-center gap-2">Cancel</div>
          ) : (
            <div className="inline-flex items-center gap-2">
              Join now
              <ArrowRightOutlined />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}

export default QuickMatchingItem;
