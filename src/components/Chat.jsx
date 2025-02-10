import React, { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { useParams } from "react-router-dom";
import {io} from "socket.io-client"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";



const Chat = () => {
    const {targetUserId} = useParams();
    const user = useSelector(store => store.user)
    const userId = user?._id
  const [messages , setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    const socket = createSocketConnection();
    socket.emit("sendMessage", {firstName :user.firstName, userId, targetUserId ,text : newMessage})
      setNewMessage("")
  }
useEffect(()=>{

    if(!userId) return;
        const socket = createSocketConnection();

        socket.emit("joinChat", {userId , targetUserId});


    socket.on("messageReceived", ({firstName , text})=>{
      console.log(firstName +" has sent " + text);
      setMessages((prev)=>[...prev , {firstName , text}])
      
    })

        return()=>{
            socket.disconnect();
        }
},[userId,targetUserId])


  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>
      <div className="flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg,index) => (
            <div key={index} className={`flex ${msg.firstName === user.firstName ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs mx-2 ${msg.firstName === user.firstName ? "order-1" : "order-2"}`}>
                <div
                  className={`px-4 py-2 rounded-lg inline-block ${
                    msg.firstName === user.firstName ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.firstName} •  
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat

