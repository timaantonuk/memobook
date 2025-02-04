import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EmojiSelect from "@/components/EmojiSelect";

export default function PopoverBtn() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-12' variant="outline">Create Category</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">


                    <div className="grid gap-4">
                        <div className="flex justify-between gap-2 items-center">
                            <Label htmlFor="name" className='flex'>Name:</Label>
                            <Input
                                id="name"
                                className="col-span-2 h-12 w-[65%]"
                                placeholder='Category name:'
                            />
                        </div>
                        <div className="flex justify-between gap-2 items-center">
                            <Label htmlFor="icon">Icon:</Label>
                            <EmojiSelect
                                id="icon"
                                placeholder='Category icon:'
                            />
                        </div>

                        <Button className='h-12'>Create</Button>

                </div>
            </PopoverContent>
        </Popover>
    )
}
