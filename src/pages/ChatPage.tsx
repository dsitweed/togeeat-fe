import { AuthContext } from "@/contexts/auth";
import { newSocket } from "@/plugins/socketio";
import { IconPhotoPlus, IconSend } from "@tabler/icons-react";
import { Avatar, Card, Input, Tooltip, Upload } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

function setupSocketEvents(socket: Socket) {
  socket.on("createMessage", () => {
    console.log("connected, id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
    throw err;
  });
}

// function RoomsList()

function ChatPage(): JSX.Element {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token") as string;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState<any>(null);

  const [rooms, setRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string>();

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (socket && currentRoomId) {
      socket
        .emitWithAck("createMessage", {
          groupId: currentRoomId,
          content: newMessage,
          contentType: "TEXT",
        })
        .then((data) => {
          console.log("createMessage", data);
        })
        .catch((err) => {
          console.error(err);
        });
      // clear message input
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket
      ?.emitWithAck("getMessages", {
        groupId: currentRoomId,
        limit: 100,
        offset: 0,
      })
      .then((data) => {
        console.log(data);
        setMessages(data.items.reverse());
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [currentRoomId]);

  useEffect(() => {
    // componentwillmount in functional component.
    const sock = newSocket(token);

    sock.connect();

    sock.on("connect", () => {
      console.log("connected, id: ", sock.id);
      setSocket(sock);
      setupSocketEvents(sock);
    });

    sock.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      setError(err);
    });

    // load all rooms
    sock
      .emitWithAck("getGroups", {
        limit: 1000,
        offset: 0,
      })
      .then((data) => {
        setRooms(data.items);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    sock.on("createMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      var elem = document.getElementById("message-list");
      if (elem) {
        elem.scrollTo({
          top: elem.scrollHeight,
        });
      }
    });

    return () => {
      // componentwillunmount in functional component.
      sock.disconnect();
    };
  }, []);

  return error ? (
    <div>Connection error: {JSON.stringify(error)}</div>
  ) : socket ? (
    <div className="flex h-full">
      <div className="flex flex-col min-w-[360px] px-2 py-4 gap-4 bg-primary bg-opacity-10 overflow-auto">
        {rooms?.map((room, index) => (
          <Card
            className="cursor-pointer"
            key={index}
            onClick={() => setCurrentRoomId(room.id)}
          >
            {/* {JSON.stringify(room)} */}
            <Card.Meta
              avatar={
                <Avatar
                  src={
                    room.usersGroups?.at(1)?.user?.avatar ||
                    room.usersGroups?.at(0)?.user?.avatar
                  }
                />
              }
              title={room?.usersGroups
                ?.map((user: any) => user.user.name)
                .join(", ")}
              description={
                <div className="flex flex-row justify-between">
                  <p>{dayjs(room.lastMessageAt).fromNow()}</p>
                </div>
              }
            ></Card.Meta>
          </Card>
        ))}
      </div>
      <div
        style={{ display: currentRoomId ? "flex" : "none" }}
        className="flex flex-1 h-full w-full flex-col bg-primary bg-opacity-5 p-4"
      >
        <Avatar.Group className="pb-4 border-b">
          {rooms
            .find((item) => item.id === currentRoomId)
            ?.usersGroups?.map((user: any) => (
              <Tooltip title={user.user.name}>
                <Avatar src={user.user.avatar} />
              </Tooltip>
            ))}
        </Avatar.Group>
        <div
          id="message-list"
          className="flex flex-col h-full gap-2 py-4 overflow-y-scroll"
        >
          {messages?.map((message, index) => (
            <div
              style={{
                alignSelf:
                  message.sender.name === user?.name ? "end" : "inherit",
              }}
              className="px-4 py-3 w-fit bg-white rounded-lg"
              key={index}
            >
              {message.sender.name === user?.name ? (
                <div className="self-end">
                  {message.contentType === "TEXT" ? (
                    <p>{message.content}</p>
                  ) : (
                    <img className="h-40" src={message.content} />
                  )}
                </div>
              ) : (
                <div className="flex flex-row  gap-2 items-center">
                  <Tooltip title={message.sender.name}>
                    <Avatar src={message.sender.avatar} />
                  </Tooltip>
                  {message.contentType === "TEXT" ? (
                    <p>{message.content}</p>
                  ) : (
                    <img className="h-40" src={message.content} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <Input.Search
            className=""
            addonBefore={
              <div className="cursor-pointer">
                <Upload
                  showUploadList={false}
                  customRequest={async (option) => {
                    var formData = new FormData();
                    formData.append("image", option.file);
                    const response = await axios.post("/file/image", formData, {
                      headers: {
                        "content-type":
                          "multipart/form-data; boundary=----WebKitFormBoundarylxPKmc0lTbNeKbx8",
                      },
                    });
                    if (socket && currentRoomId) {
                      socket
                        .emitWithAck("createMessage", {
                          groupId: currentRoomId,
                          content: response.data.url,
                          contentType: "IMAGE",
                        })
                        .then((data) => {
                          console.log("createMessage", data);
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    }
                  }}
                >
                  <IconPhotoPlus />
                </Upload>
              </div>
            }
            placeholder="Write some message"
            onChange={(event) => setNewMessage(event.target.value)}
            value={newMessage}
            enterButton={<IconSend />}
            onSearch={() => {
              console.log(newMessage);
              handleSendMessage();
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Connecting...</div>
  );
}

export default ChatPage;
