
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  Send,
  User,
  Phone,
  ArrowLeft,
  Users
} from "lucide-react";

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      message: "Salom, buyurtmam haqida savol bor edi",
      time: "10:25",
      orderId: "ORD-001"
    },
    {
      id: 2,
      sender: "dispatcher",
      message: "Salom! Sizga qanday yordam bera olaman?",
      time: "10:26"
    },
    {
      id: 3,
      sender: "user", 
      message: "Haydovchi qachon keladi?",
      time: "10:32"
    }
  ]);

  const userRole = localStorage.getItem('userRole');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: userRole === 'dispatcher' ? 'dispatcher' : 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, message]);
      setNewMessage("");

      // Auto-reply from dispatcher (demo)
      if (userRole !== 'dispatcher') {
        setTimeout(() => {
          const reply = {
            id: messages.length + 2,
            sender: 'dispatcher',
            message: "Xabaringiz qabul qilindi. Tez orada javob beramiz.",
            time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, reply]);
        }, 2000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Chat</h1>
          <p className="text-muted-foreground">
            {userRole === 'dispatcher' ? 'Mijozlar bilan aloqa' : 'Dispatcher bilan aloqa'}
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Faol chat
        </Badge>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {userRole === 'dispatcher' ? <User className="h-4 w-4" /> : <Users className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {userRole === 'dispatcher' ? 'Mijoz chat' : 'Dispatcher'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {userRole === 'dispatcher' ? 'Buyurtma #ORD-001' : 'Yordam va qo\'llab-quvvatlash'}
              </p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-800">Onlayn</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    (message.sender === 'dispatcher' && userRole === 'dispatcher') ||
                    (message.sender === 'user' && userRole !== 'dispatcher')
                      ? "justify-end" 
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      (message.sender === 'dispatcher' && userRole === 'dispatcher') ||
                      (message.sender === 'user' && userRole !== 'dispatcher')
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        (message.sender === 'dispatcher' && userRole === 'dispatcher') ||
                        (message.sender === 'user' && userRole !== 'dispatcher')
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
              <Textarea
                placeholder="Xabar yozing..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-0 resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="sm"
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tez harakatlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" onClick={() => setNewMessage("Buyurtmam qayerda?")}>
              Buyurtma holati
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNewMessage("Haydovchi ma'lumotlari kerak")}>
              Haydovchi ma'lumoti
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNewMessage("Manzilni o'zgartirish mumkinmi?")}>
              Manzil o'zgartirish
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNewMessage("Rahmat!")}>
              Rahmat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
