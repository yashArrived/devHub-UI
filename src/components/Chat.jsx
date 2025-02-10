"use client"

import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"

const Chat = () => {
  const { targetUserId } = useParams()
  const user = useSelector((store) => store.user)
  const userId = user?._id
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    const socket = createSocketConnection()
    socket.emit("sendMessage", { firstName: user.firstName, userId, targetUserId, text: newMessage })
    setNewMessage("")
  }

  useEffect(() => {
    if (!userId) return
    const socket = createSocketConnection()
    socket.emit("joinChat", { userId, targetUserId })

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " has sent " + text)
      setMessages((prev) => [...prev, { firstName, text }])
    })

    return () => {
      socket.disconnect()
    }
  }, [userId, targetUserId])

  return (
    <div className="flex justify-center mt-3">
    <div className="w-full max-w-2xl  bg-[#1E293B] shadow-xl rounded-xl border border-[#2D3B4E]">
      <div className="p-4 border-b border-[#2D3B4E] bg-[#1E293B]">
        <h2 className="text-lg font-semibold text-white">Chat Room</h2>
      </div>
      <div className="flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.firstName === user.firstName ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs mx-2 ${msg.firstName === user.firstName ? "order-1" : "order-2"}`}>
                <div
                  className={`px-4 py-2 rounded-lg inline-block ${
                    msg.firstName === user.firstName ? "bg-[#818CF8] text-white" : "bg-[#2D3B4E] text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-400 mt-1">{msg.firstName} •</div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#2D3B4E] p-4">
          <form onSubmit={handleSend} className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-[#2D3B4E] text-white border-none rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818CF8] placeholder-gray-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#818CF8] text-white px-4 py-2 rounded-r-lg hover:bg-[#6B7CF9] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Chat

