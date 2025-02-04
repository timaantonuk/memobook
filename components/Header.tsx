import React from 'react';
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {FolderHeart} from "lucide-react";
import {UserAvatar} from "@/components/UserAvatar";
import TopNavigation from "@/components/TopNavigation";
import LogOff from "@/components/LogOff";


const Header = () => {
    return (
        <header className='flex flex-col justify-center items-center gap-1 main-container relative pb-5 pt-2'>
            <TopNavigation/>
            <div className='flex gap-5 justify-center items-center'>
                <h1 className='heading-1 font-extrabold'>MemoBook</h1>
                <FolderHeart className='w-16 h-16'/>
            </div>
            <div className="flex gap-5 justify-center items-center">
                <UserAvatar/>
                <h3 className='heading-3 font-light'>Welcome, Tymofii 👋</h3>
            </div>

            <div className='flex gap-3 fixed top-[7%] right-[25%]'>
                <LogOff/>
                <ThemeSwitcher/>
            </div>

        </header>
    );
};

export default Header;