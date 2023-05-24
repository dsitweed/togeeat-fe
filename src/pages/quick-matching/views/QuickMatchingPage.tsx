import { App, Button } from "antd";

function QuickMatchingPage() {
  const { notification } = App.useApp();
  return (
    <div>
      <Button
        onClick={() =>
          notification.success({
            message: "Yes",
          })
        }
      >
        Error
      </Button>{" "}
    </div>
  );
}

export default QuickMatchingPage;
