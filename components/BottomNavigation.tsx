'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BadgePlus, GraduationCap, House, SearchCheck} from "lucide-react";
import Link from "next/link";


const BottomNavigation = () => {
    return (
        <div className='fixed bottom-1 left-[50%] -translate-x-[50%] lg:static lg:translate-x-0 flex justify-center lg:mt-5'><Tabs defaultValue="account">
            <TabsList>
                <TabsTrigger value="account">
                    <Link className='flex gap-1 items-center' href='/dashboard'>
                        <House/> Home
                    </Link>
                </TabsTrigger>

                <TabsTrigger value="create">
                    <Link className='flex gap-1 items-center' href='/create'>
                        <BadgePlus/> Create
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="learn">

                    <Link className='flex gap-1 items-center' href='/learn'>
                        <GraduationCap/> Learn
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="faq">
                    <Link className='flex gap-1 items-center' href='/faq'>
                        <SearchCheck/>FAQ
                    </Link>

                </TabsTrigger>
            </TabsList>
        </Tabs>
        </div>

    );
};

export default BottomNavigation;