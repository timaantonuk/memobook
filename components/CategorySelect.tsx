'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategoryStore } from "@/app/store/categories-store";

interface CategorySelectProps {
    value?: string; // `categoryId` хранится тут
    onValueChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export default function CategorySelect({
                                           value,
                                           onValueChange,
                                           className,
                                           placeholder,
                                       }: CategorySelectProps) {
    const categories = useCategoryStore((state) => state.categories);

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder || "Select a category"}>
                    {categories.find((c) => c.id === value)?.name || "Select a category"}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}