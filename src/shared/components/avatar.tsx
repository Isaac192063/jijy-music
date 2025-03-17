import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarPerfil({url}: {url : string}) {
    console.log(url);
    return (
        <Avatar>
            {url && <AvatarImage src={url} alt={url} />}
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
