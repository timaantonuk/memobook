"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { Redo, Undo } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import RepeatStepper from "@/components/RepeatStepper"
import { PanInfo } from "framer-motion"
import { useCardStore } from "@/app/store/card-store"

export default function CardContainer() {
    const cards = useCardStore((state) => state.cards)
    const [cardState, setCardState] = useState<"forget" | "remember" | "initial">("initial")

    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const background = useTransform(x, xInput, [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(26, 0, 96) 100%)",
        "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
    ])

    const handleStateChange = (newState: "initial" | "forget" | "remember") => {
        setCardState(newState)
    }

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: number) => {
        if (info.offset.x > 50) {
            handleStateChange("remember")
        } else if (info.offset.x < -50) {
            handleStateChange("forget")
        } else {
            handleStateChange("initial")
        }

        if (Math.abs(info.offset.x) > 100) {
            setTimeout(() => {
                useCardStore.setState((state) => ({
                    cards: state.cards.filter((card) => card.id !== id),
                }))
                setCardState("initial")
            }, 200)
        }
    }

    useEffect(() => {
        console.log(`Card state: ${cardState}`)
    }, [cardState])

    return (
        <motion.div
            className="flex justify-center items-center flex-1 w-full h-full max-w-full rounded-[20px] py-16 relative flex-col"
            style={{ background }}
        >
            <div className="memory-card"></div>
            <div className="pb-4 flex gap-5 fading-text">
                <Undo /> <span>Swipe card</span> <Redo />
            </div>
                {cards.length > 0 ? (
                    cards.map((card, index) => (


                            <CardItem
                            key={card.id}
                            card={card}
                            index={index}
                            totalCards={cards.length}
                            handleDragEnd={handleDragEnd}
                        />

                    ))
                ) : (
                    <div>loading...</div>
                )}
        </motion.div>
    )
}

const CardItem = ({ card, index, totalCards, handleDragEnd }: any) => {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-150, 150], [-10, 10])
    const zIndex = totalCards - index

    return (
        <motion.div
            className="absolute lg:w-[60%] w-[90%] h-auto bg-[hsl(262.1_83.3%_57.8%)] rounded-[20px] lg:p-5 py-5 px-2 icon-container flex flex-col gap-5"
            style={{
                x,
                rotate,
                zIndex,
                top: index * 5,
                left: index % 2 === 0 ? -index * 5 : index * 5,
                opacity: index === totalCards - 1 ? 1 : 0.9,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(event, info) => handleDragEnd(event, info, card.id)}
        >
            <motion.div className="flex gap-5 items-center justify-center relative">
                <h1 className="heading-1">{card.title}</h1>
                <svg className="progress-icon h-16 w-16" viewBox="0 0 50 50">
                    <motion.path
                        fill="none"
                        strokeWidth="2"
                        stroke="white"
                        d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    />
                </svg>
            </motion.div>

            {card.photoUrl ? (
                <img
                    src={card.photoUrl}
                    alt="Card image"
                    loading="lazy"
                    className="pointer-events-none w-full lg:max-h-64 object-cover object-center rounded-2xl bg-no-repeat min-w-full min-h-40 max-h-40 lg:min-h-64"
                />
            ) : (
                <div>No photo</div>
            )}

            <ReactMarkdown className="justify-self-center" rehypePlugins={[rehypeHighlight]}>
                {card.description}
            </ReactMarkdown>
            <Separator />
            <footer className="flex justify-between px-5 text-xs lg:text-lg">
                <RepeatStepper />
                <div>
                    <p>Category: {card.category}</p>
                    <p className="text-xs text-muted">Will be repeated in {card.nextReview} days</p>
                </div>
            </footer>
        </motion.div>
    )
}


