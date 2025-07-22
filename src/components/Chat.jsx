import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatHeader, setChatHeader] = useState("Chat");
  const [chatPic, setChatPic] = useState("");
  const user = useSelector((store) => store.user);
  const allConnectionsData = useSelector((store) => store.connections);
  console.log(allConnectionsData);
  const userId = user?._id;
  const fetchChat = async () => {
    const allMessages = await axios.get(
      BASE_URL + `/chat/history/${targetUserId}`,
      { withCredentials: true }
    );
    const chatMessages = allMessages.data.messages.map((message) => {
      const { firstName, lastName } = message.senderId;
      return {
        firstName: firstName,
        lastName: lastName,
        text: message.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      fromUserId: userId,
      toUserId: targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId || !targetUserId) return;
    if (targetUserId && allConnectionsData) {
      const user = allConnectionsData.find(
        (connection) => connection._id === targetUserId
      );
      if (user) {
        setChatHeader(user.firstName + " " + user.lastName);
        setChatPic(user.photoUrl);
      }
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      fromUserId: userId,
      toUserId: targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("message received", { firstName, text });
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId]);

  return (
    <>
      <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <div className="flex flex-row p-2 border-b  border-gray-600 ">
          <div className="flex h-15 w-15 rounded-2xl">
            <img src={chatPic} />
          </div>
          <div className="flex flex-col p-2">
            <div className="flex">
              <h1 className="">{chatHeader}</h1>
            </div>
            <div className="flex">
              <span className="status-lg rounded-2xl status-success my-1.5"></span>
              <h3 className="mx-1">Online</h3>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-scroll p-5">
          {messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  "chat " +
                  (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header">
                  {`${msg.firstName}  ${msg.lastName}`}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-black rounded p-2"
          ></input>
          <button onClick={sendMessage} className="btn btn-secondary">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
