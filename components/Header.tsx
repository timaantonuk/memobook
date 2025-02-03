import React from 'react';
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {FolderHeart} from "lucide-react";
import {UserAvatar} from "@/components/UserAvatar";


const Header = () => {
    return (
        <header className='flex flex-col justify-center items-center gap-5 main-container relative'>
            <div className='flex gap-5 justify-center items-center'>
                <h1 className='heading-1 font-extrabold'>MemoBook</h1>
                <FolderHeart className='w-16 h-16'/>
            </div>
            <div className="flex gap-5 justify-center items-center">
                <UserAvatar/>
                <h2 className='heading-2 font-light'>Welcome, Tymofii 👋</h2>
            </div>

            <ThemeSwitcher/>
        </header>
    );
};

export default Header;