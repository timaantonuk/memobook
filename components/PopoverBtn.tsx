'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategoryStore } from "@/app/store/categories-store";
import { useUserStore } from "@/app/store/user-store";
import { createCategory } from "@/app/utils/categoryService";

export default function PopoverBtn() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [open, setOpen] = useState(false);

    const addCategory = useCategoryStore((state) => state.addCategory);
    const user = useUserStore((state) => state);

    const handleClick = async () => {
        const namePart = inputRef.current?.value || "";
        const categoryName = `${namePart} ${selectedEmoji}`.trim();

        if (categoryName && user.id) {
            const newCategory = { name: categoryName, userId: user.id };
            const savedCategory = await createCategory(newCategory);
            addCategory(savedCategory);
            setOpen(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="h-12" variant="outline">Create Category</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="grid gap-4">
                    <div className="flex justify-between gap-2 items-center">
                        <Label htmlFor="name">Name:</Label>
                        <Input ref={inputRef} id="name" className="col-span-2 h-12 w-[65%]" placeholder="Category name:" />
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                        <Label htmlFor="icon">Icon:</Label>
                        <div id="icon" className="w-[65%]">
                            <Select value={selectedEmoji} onValueChange={setSelectedEmoji}>
                                <SelectTrigger><SelectValue placeholder="Select an emoji" /></SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Emojis</SelectLabel>
                                        <SelectItem value="🧠">🧠</SelectItem>
                                        <SelectItem value="🔥">🔥</SelectItem>
                                        <SelectItem value="✅">✅</SelectItem>
                                        <SelectItem value="🥵">🥵</SelectItem>
                                        <SelectItem value="☀️">☀️</SelectItem>
                                        <SelectItem value="⚠️">⚠️</SelectItem>
                                        <SelectItem value="🦄">🦄</SelectItem>
                                        <SelectItem value="🌈️">🌈️</SelectItem>
                                        <SelectItem value="🦋">🦋</SelectItem>
                                        <SelectItem value="👾">👾</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handleClick} className="h-12">Create</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}