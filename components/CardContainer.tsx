"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { Redo, Undo } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import RepeatStepper from "@/components/RepeatStepper";
import {PanInfo} from "framer-motion";
import {useCardStore} from "@/app/store/card-store";



export default function CardContainer() {
    const cards = useCardStore((state)=>state.cards)


    const [cardState, setCardState] = useState<"forget" | "remember" | "initial">("initial")
    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const background = useTransform(x, xInput, [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(26, 0, 96) 100%)",
        "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
    ])
    const color = useTransform(x, xInput, ["rgb(211, 9, 225)", "rgb(68, 0, 255)", "rgb(3, 209, 0)"])
    const tickPath = useTransform(x, [10, 100], [0, 1])
    const crossPathA = useTransform(x, [-10, -55], [0, 1])
    const crossPathB = useTransform(x, [-50, -100], [0, 1])



    // Add this new function to handle state changes
    const handleStateChange = (newState: "initial" | "forget" | "remember") => {
        console.log(`Card state changing from ${cardState} to ${newState}`)
        setCardState(newState)
    }

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 50) {
            handleStateChange("remember")
        } else if (info.offset.x < -50) {
            handleStateChange("forget")
        } else {
            handleStateChange("initial")
        }
    }

    useEffect(() => {
        console.log(`Card state initialized or changed to: ${cardState}`)
    }, [cardState])

    return (
        <div>
            <motion.div
                className="flex justify-center items-center flex-1 w-full h-full max-w-full rounded-[20px] py-16 relative flex-col"
                style={{ background }}
            >
                <div className="memory-card"></div>
                <div className="pb-4 flex gap-5 fading-text">
                    <Undo /> <span>Swipe card</span> <Redo />
                </div>
                {cards.length > 0 ? (
                   cards.map((card) => (
                       <motion.div
                           className="lg:w-[60%] w-[90%] h-auto bg-[hsl(262.1_83.3%_57.8%)] rounded-[20px] lg:p-5 py-5 px-2 icon-container flex flex-col gap-5"
                           key={card.id}
                           style={{x}}
                           drag="x"
                           dragConstraints={{left: 0, right: 0}}
                           dragElastic={0.5}
                           onDragEnd={handleDragEnd}
                       >
                           <motion.div className="flex gap-5 items-center justify-center relative">

                               <h1 className="heading-1">{card.title}</h1>
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

                           {card.photoUrl && <img
                               src={card.photoUrl}
                               alt="Card image"
                               loading="lazy"
                               className="pointer-events-none w-full lg:max-h-64 object-cover object-center rounded-2xl bg-no-repeat min-w-full min-h-40 max-h-40 lg:min-h-64"
                           />}

                           {!card.photoUrl && <div>No photo</div>}


                           <ReactMarkdown className='justify-self-center'
                                          rehypePlugins={[rehypeHighlight]}>{card.description}</ReactMarkdown>
                           <Separator/>
                           <footer className="flex justify-between px-5 text-xs lg:text-lg">
                               <RepeatStepper/>
                               <div>
                               <p>Category: {card.category}</p>
                                   <p className='text-xs text-muted'>Will be repeated at {card.nextReview} days</p>
                               </div>

                           </footer>
                       </motion.div>
                   ))
                ) : (
                    <div>loading...</div>
                )}
            </motion.div>
        </div>
    )
}

const description = `
Как пользоваться приложением? Создайте аккаунт и войдите в него. На главной странице вы можете видеть вашу статистику, стрик дней а также поставить цель по выученным карточкам. Создайте категорию и карточку во вкладке "создать", например "Цитаты из фильмов". Учите карточки на вкладке "учить" с помощью интерактивных свайпов и алгоритма Spaced Repetition. Как пользоваться приложением? Создайте аккаунт и войдите в него. На главной странице вы можете видеть вашу статистику, стрик дней а также поставить цель по выученным карточкам. Создайте категорию и карточку во вкладке "создать", например "Цитаты из фильмов". Учите карточки на вкладке "учить" с помощью интерактивных свайпов и алгоритма Spaced Repetition. 
`

