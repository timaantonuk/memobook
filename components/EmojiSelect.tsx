import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function EmojiSelect() {
    return (
        <Select>
            <SelectTrigger className="w-[65%]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="brain">🧠</SelectItem>
                    <SelectItem value="fire">🔥</SelectItem>
                    <SelectItem value="checkmark">✅</SelectItem>
                    <SelectItem value="sad">🥵</SelectItem>
                    <SelectItem value="talk">🗣️</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
