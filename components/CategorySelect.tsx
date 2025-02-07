import * as React from "react";
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

interface CategorySelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export default function CategorySelect({
                                           value,
                                           onValueChange,
                                           className,
                                           placeholder,
                                       }: CategorySelectProps) {
    const categoriesState = useCategoryStore((state) => state.categories);

    console.log("Categories:", categoriesState);


    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder || "Select a category"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categoriesState.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
