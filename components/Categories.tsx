import React from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import PopoverBtn from "@/components/PopoverBtn";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

const Categories = () => {
    return (

        <article className='w-[95%] lg:w-auto'>


            <ScrollArea className="h-full w-full lg:w-[350px] rounded-md border p-4">

                <div className='flex justify-between items-center mb-5'>
                    <h3 className='heading-3'>Categories</h3>
                    <PopoverBtn/>
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

                <div className='flex items-center justify-between mb-2'>
                    <h4 className='text-xl'>Lorem</h4>
                    <Button>
                        <Trash className='w-full h-full'/>
                    </Button>
                </div>
                <Separator className='mb-2'/>

            </ScrollArea>
        </article>


    );
};

export default Categories;