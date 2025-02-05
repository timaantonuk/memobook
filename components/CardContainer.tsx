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
            <motion.div className='py-16 relative flex flex-col' style={{...container, background}}>
                <div className='memory-card'></div>
                <div className='pb-4 flex gap-5 fading-text'>
                    <Undo/> <span>Swipe card</span> <Redo/>
                </div>
                <motion.div
                    className="icon-container flex flex-col gap-5"
                    style={{...box, x}}
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
                        src='https://safariavventura.com/wp-content/uploads/2018/02/leone-africano-2.jpg'
                        alt='Card image'
                        loading='lazy'
                        className='pointer-events-none'
                    />
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{description}</ReactMarkdown>
                    <Separator/>
                    <footer className='flex justify-between px-5'>
                        <p>Category: Languages</p>
                        <p>Will be repeated in 3 days!</p>
                    </footer>
                </motion.div>
            </motion.div>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: '60%',
    height: 'auto',
    backgroundColor: 'hsl(262.1 83.3% 57.8%)',
    borderRadius: 20,
    padding: 20,
}

const container: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: '100%',
    height: '100%',
    maxWidth: "100%",
    borderRadius: 20,
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
