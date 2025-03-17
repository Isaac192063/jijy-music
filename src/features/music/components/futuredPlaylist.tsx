import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import { IFuturePLaylist } from "../pages/home/home";

export function FuturePlaylist({playlist}: {playlist: IFuturePLaylist}){

    const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);
    return (
        <Card key={playlist.id} className="border-0 bg-muted/30 transition-all overflow-hidden group cursor-pointer">
            <div 
            className="relative"
            onMouseEnter={() => setHoveredPlaylist(playlist.id)}
            onMouseLeave={() => setHoveredPlaylist(null)}
            >
            <img 
                src={playlist.image} 
                alt={playlist.title} 
                className="w-full aspect-square object-cover rounded-t-md"
            />
            <div className={`absolute right-2 bottom-2 transform ${hoveredPlaylist === playlist.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-200`}>
                <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
                <Play className="h-4 w-4 fill-current" />
                </Button>
            </div>
            </div>
            <CardContent className="p-3">
            <h3 className="font-medium text-sm truncate">{playlist.title}</h3>
            <p className="text-xs text-muted-foreground">{playlist.tracks} canciones</p>
            </CardContent>
        </Card>
    );
}