import { useApiClient } from "@/shared/hooks/api";
import { StarFilled } from "@ant-design/icons";
import { App, Avatar, Button, Input, Rate, Space, Tag } from "antd";
import React, { useState } from "react";

type Props = {};

function HistoryItem({}: Props) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { notification } = App.useApp();
  const apiClient = useApiClient("/matching-history");

  async function handleSubmit() {
    setIsLoading(true);
    const response = await apiClient.create({ rating, comment });
    if (response?.success) {
      notification.success({
        message: "Send comment success",
      });
    }
    setIsLoading(false);
  }
  return (
    <div className="flex flex-row gap-12 bg-white rounded-lg px-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          shape="square"
          size={96}
          src={"/avatar.png"}
          className="border border-solid border-slate-500"
        />
        <p className="text-2xl font-semibold">{"Stonks"}</p>
        <p className="text-base">Lasted matching: {"3 day ago"}</p>
        <Rate
          allowHalf
          defaultValue={4.5}
          character={<StarFilled style={{ fontSize: 32 }} />}
        />
        <p className="text-lg font-semibold">Favorite:</p>
        <Space size={[0, "small"]} wrap>
          <Tag color="blue">Soccer</Tag>
          <Tag color="blue">Chess</Tag>
        </Space>
        <div className="w-full flex flex-col justify-start text-base mt-4 gap-1">
          <p>Age: {"28"}</p>
          <p>Phone: {"0987654321"}</p>
          <p>Nationality: {"Viet Nam"}</p>
          <p>Language skill: {"JPLT N1"}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col align-top">
        <p className="text-lg font-semibold mb-2">Review</p>
        <div className="flex flex-col gap-4 border border-solid rounded-lg border-slate-300 p-4">
          <div className="flex flex-row gap-2 bg-slate-100 p-2 rounded-lg">
            <Avatar src={"/avatar.png"} className="shadow-lg" />
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between">
                <p className="font-semibold">User B</p>
                <p className="italic">{"21/12/2022"}</p>
              </div>
              <Rate disabled allowHalf defaultValue={4.5} />
              <p>Hihi hihi</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 bg-slate-100 p-2 rounded-lg">
            <Avatar src={"/avatar.png"} className="shadow-lg" />
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between">
                <p className="font-semibold">User B</p>
                <p className="italic">{"21/12/2022"}</p>
              </div>
              <Rate disabled allowHalf defaultValue={4.5} />
              <p>Hihi hihi</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 bg-slate-100 p-2 rounded-lg">
            <Avatar src={"/avatar.png"} className="shadow-lg" />
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between">
                <p className="font-semibold">User B</p>
                <p className="italic">{"21/12/2022"}</p>
              </div>
              <Rate disabled allowHalf defaultValue={4.5} />
              <p>Hihi hihi</p>
            </div>
          </div>
          <div className="flex items-center flex-row gap-2 bg-slate-100 p-2 rounded-lg">
            <Avatar src={"/avatar.png"} className="shadow-lg" />
            <div className="flex flex-col gap-2 w-full">
              <Rate
                disabled={isLoading}
                allowHalf
                value={rating}
                onChange={setRating}
              />
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  disabled={isLoading}
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                  onPressEnter={handleSubmit}
                  placeholder="Enter your comment"
                />
                <Button
                  loading={isLoading}
                  type="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Space.Compact>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
