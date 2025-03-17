import React, { useState } from "react";
import { 
  Search, Users, Send 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useComunityStorage } from "@/store/comunityStorage";

// 🟢 Definir los tipos para las comunidades y mensajes
interface Community {
  id: number;
  name: string;
  members: number;
  description: string;
  category: string;
  image: string;
  isPopular: boolean;
  lastActive: string;
}

interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
}

// Mensajes de ejemplo
const communityMessages: Message[] = [
  { id: 1, user: "María L.", avatar: "/api/placeholder/40/40", content: "¿Alguien ha escuchado el nuevo álbum de Arctic Monkeys?", time: "14:35", likes: 8, replies: 3 },
  { id: 2, user: "Carlos G.", avatar: "/api/placeholder/40/40", content: "¡Sí! Mi canción favorita es 'There'd Better Be A Mirrorball'", time: "14:42", likes: 5, replies: 2 }
];

export const CommunityPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"todas" |  "mis">("todas");
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");

  const {comunities} = useComunityStorage()
  // Filtrar comunidades según la pestaña seleccionada
  const filteredCommunities = selectedTab === "mis" 
    ? comunities.filter(c => c.isPopular) 
    : comunities;
    
  const handleSelectCommunity = (community: Community) => {
    setSelectedCommunity(community);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje
    setMessageInput("");
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Panel izquierdo - Lista de comunidades */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <h1 className="text-2xl font-bold flex items-center my-3">
            <Users className="mr-2 h-6 w-6 text-orange-500" />
            Comunidades
          </h1>

          {/* Buscador */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 bg-muted/30 border border-muted"
              placeholder="Buscar comunidades..." 
            />
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="todas" className="mb-4" onValueChange={(val) => setSelectedTab(val as "todas"  | "mis")}>
            <TabsList className="w-full">
              <TabsTrigger value="todas" className="flex-1">Todas</TabsTrigger>
              <TabsTrigger value="mis" className="flex-1">Mis comunidades</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Lista de comunidades */}
          <div className="space-y-2 overflow-auto max-h-[600px]">
            {filteredCommunities.map(community => (
              <Card 
                key={community.id}
                className={`cursor-pointer hover:bg-orange-50 ${selectedCommunity?.id === community.id ? 'border-orange-500 bg-orange-50' : ''}`}
                onClick={() => handleSelectCommunity(community)}
              >
                <CardContent className="p-3 flex items-center">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={community.image} alt={community.name} />
                    <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{community.name}</h3>
                    <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                      {community.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Panel derecho - Chat de la comunidad */}
        <div className="flex-1 rounded-lg border border-muted-foreground/20 bg-card">
          {selectedCommunity ? (
            <div className="flex flex-col h-full max-h-[700px]">
              {/* Cabecera del chat */}
              <div className="p-4 border-b flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedCommunity.image} alt={selectedCommunity.name} />
                  <AvatarFallback>{selectedCommunity.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-bold">{selectedCommunity.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedCommunity.members} miembros • {selectedCommunity.category}</p>
                </div>
              </div>
              
              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {communityMessages.map(message => (
                  <div key={message.id} className="flex">
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={message.avatar} alt={message.user} />
                      <AvatarFallback>{message.user.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Formulario de mensaje */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex">
                  <Input
                    className="flex-1"
                    placeholder="Escribe un mensaje..."
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                  />
                  <Button type="submit" className="ml-2 bg-orange-500">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          ) : <p>Selecciona una comunidad</p>}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
