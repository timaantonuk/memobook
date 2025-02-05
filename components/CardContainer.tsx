"use client"

import {motion, useMotionValue, useTransform} from "motion/react"
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import {Redo, Undo} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";

export default function CardContainer() {
    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const background = useTransform(x, xInput, [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
        "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
    ])
    const color = useTransform(x, xInput, [
        "rgb(211, 9, 225)",
        "rgb(68, 0, 255)",
        "rgb(3, 209, 0)",
    ])
    const tickPath = useTransform(x, [10, 100], [0, 1])
    const crossPathA = useTransform(x, [-10, -55], [0, 1])
    const crossPathB = useTransform(x, [-50, -100], [0, 1])

    return (
        <div>
            <motion.div
                className='flex justify-center items-center flex-1 w-full h-full max-w-full rounded-[20px] py-16 relative  flex-col'
                style={{background}}>
                <div className='memory-card'></div>
                <div className='pb-4 flex gap-5 fading-text'>
                    <Undo/> <span>Swipe card</span> <Redo/>
                </div>
                <motion.div
                    className="lg:w-[60%] w-[90%] h-auto bg-[hsl(262.1_83.3%_57.8%)] rounded-[20px] lg:p-5 py-5 px-2 icon-container flex flex-col gap-5"
                    style={{x}}
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={0.5}
                >
                    <motion.div className='flex gap-5 items-center justify-center'>
                        <h1 className='heading-1'>Your Card</h1>
                        <svg className="progress-icon h-16 w-16" viewBox="0 0 50 50">
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                                style={{
                                    x: 5,
                                    y: 5,
                                }}
                            />
                            <motion.path
                                id="tick"
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M14,26 L 22,33 L 35,16"
                                strokeDasharray="0 1"
                                style={{pathLength: tickPath}}
                            />
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M17,17 L33,33"
                                strokeDasharray="0 1"
                                style={{pathLength: crossPathA}}
                            />
                            <motion.path
                                id="cross"
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M33,17 L17,33"
                                strokeDasharray="0 1"
                                style={{pathLength: crossPathB}}
                            />
                        </svg>
                    </motion.div>
                    <img
                        src='https://www.georgiaaquarium.org/wp-content/uploads/2018/09/whale-shark-8-750x750.jpg'
                        alt='Card image'
                        loading='lazy'
                        className='pointer-events-none w-full lg:max-h-64 object-cover object-center rounded-2xl bg-no-repeat min-w-full min-h-40 max-h-40 lg:min-h-64'
                    />
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{description}</ReactMarkdown>
                    <Separator/>
                    <footer className='flex justify-between px-5 text-xs lg:text-lg'>
                        <p>Category: Languages</p>
                        <p>Will be repeated in 3 days!</p>
                    </footer>
                </motion.div>
            </motion.div>
        </div>
    )
}

const description = `
# Welcome to My **Markdown Card** 🎉  

This is a test **description** with multiple features:  

## Features 🔥  
- **Bold** and *italic* text  
- \`Inline code\` like \`console.log("Hello")\`  
- Code blocks:  

\`\`\`tsx
const greeting = "Hello, Markdown!";  
console.log(greeting);

`
