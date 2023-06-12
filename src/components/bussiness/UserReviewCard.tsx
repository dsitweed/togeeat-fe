import { useApiClient } from "@/shared/hooks/api";
import { StarFilled } from "@ant-design/icons";
import { Avatar, Button, Input, Rate, Skeleton, Space, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type UserInfo = {
  userId: number;
};

function UserReviewCard({ userId }: UserInfo) {
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [userInfo, setUserInfo] = useState<Response.IUser>();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiClient = useApiClient("/matching-history");

  async function handleSubmit() {
    setIsLoading(true);
    await apiClient.create({ rating, comment });
    setIsLoading(false);
  }

  const load = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${userId}`);
      if (response.success) {
        setUserInfo(response.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);
  return loading ? (
    <Skeleton />
  ) : (
    <div className="flex flex-row gap-12 bg-white rounded-lg px-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          shape="square"
          size={96}
          src={userInfo?.avatar || "/avatar.jpg"}
          className="border border-solid border-slate-500"
        />
        <p className="text-2xl font-semibold">{userInfo?.name}</p>
        <p className="text-base">Lasted matching: {"3 day ago"}</p>
        <Rate
          allowHalf
          defaultValue={4.5}
          character={<StarFilled style={{ fontSize: 32 }} />}
        />
        <p className="text-lg font-semibold">{t("matching.text.favorite")}:</p>
        <Space size={[0, "small"]} wrap>
          <Tag color="blue">Soccer</Tag>
          <Tag color="blue">Chess</Tag>
        </Space>
        <div className="w-full flex flex-col justify-start text-base mt-4 gap-1">
          <p>
            {t("auth.form.age.label")}: {userInfo?.age}
          </p>
          <p>
            {t("auth.form.phone.label")}: {userInfo?.phone}
          </p>
          <p>
            {t("auth.form.nationality.label")}: {userInfo?.nationality}
          </p>
          <p>
            {t("auth.form.languageSkills.label")}: {userInfo?.languageSkills}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col align-top">
        <p className="text-lg font-semibold mb-2">
          {t("matching.text.review")}
        </p>
        <div className="flex flex-col gap-4 border border-solid rounded-lg border-slate-300 p-4">
          <div className="flex flex-row gap-2 bg-slate-100 px-4 py-3 rounded-lg">
            <Avatar src={"/avatar.jpg"} className="shadow-lg" />
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between">
                <p className="font-semibold">User B</p>
                <p className="italic">{"21/12/2022"}</p>
              </div>
              <Rate disabled allowHalf defaultValue={4.5} />
              <p>Hihi hihi</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 bg-primary bg-opacity-5 px-4 py-3 rounded-lg">
            <Avatar src={"/avatar.jpg"} className="shadow-lg" />
            <div className="flex flex-col gap-2 w-full">
              <Rate
                disabled={isLoading}
                allowHalf
                value={rating}
                onChange={setRating}
              />
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  disabled={isLoading || !rating}
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                  onPressEnter={handleSubmit}
                  placeholder={t("matching.form.comment.placeholder")}
                />
                <Button
                  loading={isLoading}
                  type="primary"
                  onClick={handleSubmit}
                >
                  {t("common.button.submit")}
                </Button>
              </Space.Compact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReviewCard;
