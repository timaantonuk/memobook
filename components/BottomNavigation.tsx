'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BadgePlus, GraduationCap, House, SearchCheck} from "lucide-react";
import Link from "next/link";


const BottomNavigation = () => {
    return (
        <div className='flex justify-center mt-5'><Tabs defaultValue="account">
            <TabsList>
                <TabsTrigger value="account">
                    <Link className='flex gap-2 items-center' href='/dashboard'>
                        <House/> Home
                    </Link>
                </TabsTrigger>

                <TabsTrigger value="create">
                    <Link className='flex gap-2 items-center' href='/create'>
                        <BadgePlus/> Create
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="learn">

                    <Link className='flex gap-2 items-center' href='/learn'>
                        <GraduationCap/> Learn
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="faq">
                    <Link className='flex gap-2 items-center' href='/faq'>
                        <SearchCheck/>FAQ
                    </Link>

                </TabsTrigger>
            </TabsList>
        </Tabs>
        </div>

    );
};

export default BottomNavigation;