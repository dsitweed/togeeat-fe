import { newSocket } from "@/plugins/socketio";
import { useEffect, useState } from "react";
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

function ChatPage(): JSX.Element {
  const token = localStorage.getItem("token") as string;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState<any>(null);

  const [rooms, setRooms] = useState<any[]>([]);
  const [totalRoomCount, setTotalRoomCount] = useState<number>(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
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
          setMessages((prev) => [...prev, data]);
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
        currentRoomId,
        limit: 100,
        offset: 0,
      })
      .then((data) => {
        /** {
         * count: 2,
         * items:  [
         * {
         * content: "Hello againnnn !!!"
         * contentType: "TEXT"
         * createdAt: "2023-07-01T04:37:25.622Z"
         * groupId: "dd99d18b-fd28-4126-9b71-7040943fd9a9"
         * id: "f710e655-5dbb-4fa6-9e9a-e0608d902dcd"
         * sender: {id: 2, name: 'Trịnh Đức Khang', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
         * senderId: 2
         * },
         * {
         * content: "Hello ae"
         * contentType: "TEXT"
         * createdAt: "2023-07-01T04:37:25.622Z"
         * groupId: "dd99d18b-fd28-4126-9b71-7040943fd9a9"
         * id: "c9e070c2-ce9f-403b-b1b1-2c9d08052939"
         * sender: {id: 2, name: 'Trịnh Đức Khang', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
         * senderId: 2
         * },
         * ]} */
        console.log(data);
        setTotalMessagesCount(data.count);
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
        limit: 10,
        offset: 0,
      })
      .then((data) => {
        /**
         * data = {
         *  count: number,
         *  items: [
         *    {
         *     createdAt: "2023-07-01T04:33:34.759Z"
         *     id: "dd99d18b-fd28-4126-9b71-7040943fd9a9"
         *     isGroup: false
         *     lastMessageAt: "2023-07-01T04:33:34.759Z"
         *     name: "Hoc hoi",
         *     users: [
         * {id: 1, name: 'Trịnh Đức Khang', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
         * {id: 2, name: 'Trịnh Đức Khang', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
         * {id: 3, name: 'Nguyen Van Ky', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
         * ],
         *    },
         *  ]
         * }
         */
        console.log("data", data);
        setTotalRoomCount(data.count);
        setRooms(data.items);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    sock.on("createMessage", (data) => {
      // TODO: process data
      console.log("on createMessage: ", data);
    });

    return () => {
      // componentwillunmount in functional component.
      sock.disconnect();
    };
  }, []);

  return error ? (
    <div>Connection error: {JSON.stringify(error)}</div>
  ) : socket ? (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div>{totalRoomCount} rooms:</div>
        {rooms.map((room, index) => (
          <button key={index} onClick={() => setCurrentRoomId(room.id)}>
            {room.users.map((user: any) => user.name).join(", ")}
          </button>
        ))}
        {/* <div>
          <input type="text"/>
        </div> */}
      </div>
      <div
        style={{
          display: "flex",
          flex: 4,
          flexDirection: "column",
        }}
      >
        <div>{totalMessagesCount} messages:</div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {message.sender.name}: {message.content}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            type="text"
            placeholder="Write some message"
            onChange={(event) => setNewMessage(event.target.value)}
            value={newMessage}
          />
          <input
            type="submit"
            value="Send"
            onClick={(e) => {
              e.preventDefault();
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
