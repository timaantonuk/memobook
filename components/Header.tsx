'use client'
import React from 'react';
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {BookOpenCheck, FolderHeart, User} from "lucide-react";
import {UserAvatar} from "@/components/UserAvatar";
import TopNavigation from "@/components/TopNavigation";

import {SignedIn, UserButton} from "@clerk/nextjs";
import {useSession} from "@clerk/nextjs";
import Link from "next/link";
import {useUserStore} from "@/app/store/user-store";



const Header = () => {


    const {isSignedIn} = useSession()
    const userState = useUserStore((state)=>state)
    const defineName = userState.firstName ? userState.firstName : userState.username ? userState.username  : 'Guest'


    return (
        <header className='flex flex-col justify-center items-center gap-3 lg:gap-1 main-container relative pb-5 pt-2'>
            <TopNavigation/>
            <div className='flex gap-3 justify-center items-center'>
                <h1 className='heading-1 font-extrabold'>MemoBook</h1>
                {/*<FolderHeart className='hidden lg:block lg:w-20 lg:h-20'/>*/}
                <BookOpenCheck className='hidden lg:block lg:w-10 lg:h-10' />
            </div>
            <div className="flex gap-2 lg:gap-5 justify-center items-center">
                <UserAvatar imgUrl={userState.imageUrl ? userState.imageUrl : 'https://api.dicebear.com/9.x/pixel-art/svg'}/>
                <h3 className='heading-3 font-light'>Welcome, {defineName} 👋</h3>
            </div>

            <div className='hidden lg:flex items-center gap-3 absolute top-[30%] right-[25%]'>

                {isSignedIn ? '' : <Link href='/dashboard'><User/></Link>}
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <ThemeSwitcher/>
            </div>

        </header>
    );
};

export default Header;