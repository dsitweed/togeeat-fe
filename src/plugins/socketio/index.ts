import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

const URL = import.meta.env.VITE_APP_API_URL;

export function newSocket(token: string): Socket {
  return io(`${URL}/chat`, {
    autoConnect: false,
    extraHeaders: {
      token,
    },
  });
}
