import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  Phone,
  MapPin,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";

const DispatcherChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const chatList = [
    {
      id: 1,
      customer: "Alisher Karimov",
      orderId: "ORD-001",
      lastMessage: "Haydovchi qachon keladi?",
      time: "10:32",
      unread: 2,
      status: "jarayonda",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      customer: "Malika Saidova",
      orderId: "ORD-002",
      lastMessage: "Manzilni o'zgartirish mumkinmi?",
      time: "10:28",
      unread: 1,
      status: "kutayotgan",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      customer: "Jahongir Toshev",
      orderId: "ORD-003",
      lastMessage: "Rahmat, xizmat uchun",
      time: "09:45",
      unread: 0,
      status: "tugallangan",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      customer: "Nodira Abdullayeva",
      orderId: "ORD-004",
      lastMessage: "Iltimos, tezroq yuboring",
      time: "09:30",
      unread: 3,
      status: "jarayonda",
      avatar: "/placeholder.svg"
    },
  ];

  const currentChatMessages = [
    {
      id: 1,
      sender: "customer",
      message: "Salom, buyurtma qildim",
      time: "10:25",
    },
    {
      id: 2,
      sender: "dispatcher",
      message: "Salom! Buyurtmangiz qabul qilindi. Haydovchi tez orada keladi.",
      time: "10:26",
    },
    {
      id: 3,
      sender: "customer",
      message: "Haydovchi qachon keladi?",
      time: "10:32",
    },
    {
      id: 4,
      sender: "dispatcher",
      message: "5-7 daqiqada keladi. Haydovchi: Bobur Umarov, tel: +998 90 123 45 67",
      time: "10:33",
    },
  ];

  const currentChat = chatList.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Demo: Add message to list
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "jarayonda":
        return <Badge className="bg-yellow-100 text-yellow-800">Jarayonda</Badge>;
      case "kutayotgan":
        return <Badge className="bg-blue-100 text-blue-800">Kutayotgan</Badge>;
      case "tugallangan":
        return <Badge className="bg-green-100 text-green-800">Tugallangan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Mijozlar chat ({chatList.filter(chat => chat.unread > 0).length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-350px)]">
            <div className="space-y-1 p-4">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === chat.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{chat.customer}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                          {chat.unread > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-2">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">#{chat.orderId}</span>
                        {getStatusBadge(chat.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2">
        {currentChat ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar>
                    <AvatarImage src={currentChat.avatar} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{currentChat.customer}</h3>
                    <p className="text-sm text-muted-foreground">#{currentChat.orderId}</p>
                  </div>
                  {getStatusBadge(currentChat.status)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Qo'ng'iroq
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Manzil
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-500px)] p-4">
                <div className="space-y-4">
                  {currentChatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "dispatcher" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "dispatcher"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "dispatcher"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Xabar yozing..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chat tanlang</h3>
              <p className="text-muted-foreground">
                Mijoz bilan chat boshlash uchun chap tarafdan chatni tanlang
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default DispatcherChatPage;