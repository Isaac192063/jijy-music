import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarPerfil({url}: {url : string}) {
    return (
        <Avatar>
            <AvatarImage src={url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
