import { useApiClient } from "@/shared/hooks/api";
import { StarFilled } from "@ant-design/icons";
import { Avatar, Button, Input, Rate, Space, Tag } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {} & Response.IUser;

interface IReview {}

function UserReview(props: Props) {
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);

  const apiClient = useApiClient("/review");

  async function handleSubmit() {
    setIsLoading(true);
    await apiClient.create({
      star: rating,
      content: comment,
      user2Id: props.id,
    });
    setIsLoading(false);
  }

  const fetchReviews = async () => {
    const response = await axios.get("/review");
    if (response.success) {
      setReviews(response.data.items);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-row gap-12 bg-white rounded-lg px-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          shape="square"
          size={96}
          src={props.avatar && "/avatar.jpg"}
          className="border border-solid border-slate-500"
        />
        <p className="text-2xl font-semibold">{props.name}</p>
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
            {t("auth.form.age.label")}: {props.age}
          </p>
          <p>
            {t("auth.form.phone.label")}: {props.phone}
          </p>
          <p>
            {t("auth.form.nationality.label")}: {props.nationality}
          </p>
          <p>
            {t("auth.form.languageSkills.label")}: {props.languageSkills}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col align-top">
        <p className="text-lg font-semibold mb-2">
          {t("matching.text.review")}
        </p>
        <div className="flex flex-col gap-4 border border-solid rounded-lg border-slate-300 p-4">
          {reviews.map((review) => (
            <div className="flex flex-row gap-2 bg-slate-100 px-4 py-3 rounded-lg">
              <Avatar src={"/avatar.jpg"} className="shadow-lg" />
              <div className="flex flex-col w-full">
                <div className="w-full flex flex-row justify-between">
                  <p className="font-semibold">{review.user?.name}</p>
                  <p className="italic">
                    {dayjs(review.createdAt).format("L")}
                  </p>
                </div>
                <Rate disabled allowHalf defaultValue={review.star} />
                <p>{review.content}</p>
              </div>
            </div>
          ))}
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

export default UserReview;
