import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function UserAvatar({imgUrl}) {
    return (
        <Avatar>
            <AvatarImage src={imgUrl} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
