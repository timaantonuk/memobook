"use client"
import { motion } from "framer-motion"
import FaqAccordion from "@/components/FaqAccordion"

const appDescription = [
    {
        heading: "How to Use the App",
        description:
            "Sign up and log in to access your personalized dashboard. On the main page, you can view your statistics, track your streak, and set learning goals. In the 'Create' tab, add categories and flashcards (for example, 'Movie Quotes'), then practice using interactive swipe gestures in the 'Learn' tab.",
    },
    {
        heading: "Motivation",
        description:
            "I built MemoBook because I struggled with remembering information and wanted a better solution. Unlike many existing apps that require subscriptions and don’t work well for me, MemoBook leverages a proven spaced repetition algorithm and is completely free—always accessible to new users.",
    },
    {
        heading: "How the Spaced Repetition Algorithm Works",
        description:
            "The spaced repetition algorithm is designed to boost long-term retention by scheduling reviews of new information at gradually increasing intervals. When you first learn a card, it is reviewed after a short period to ensure you revisit the material before it fades from memory. As you continue to answer correctly, the intervals between reviews lengthen, allowing your brain to consolidate what you've learned while focusing on more challenging content. If you struggle with a card, the algorithm adapts by shortening the interval so that the material is reviewed more frequently. This adaptive system streamlines your study sessions by emphasizing cards that need more attention while reducing repetition of information you have already mastered, ultimately leading to more efficient learning and better retention.",
    },
    {
        heading: "Contact",
        description:
            "If you discover any bugs, have suggestions for improvements, or just want to share your feedback, please email me at tima.antonuk2@gmail.com. I look forward to hearing from you and am happy to answer any questions.",
    },
];

const Page = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: (i: number) => ({
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    }

    return (
        <section className="main-container flex flex-col items-center min-h-screen">
            <motion.div
                className="flex flex-col gap-5 items-center w-[75%] mt-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {appDescription.map((item, i) => (
                    <motion.div key={i} variants={itemVariants} custom={i} className="w-full">
                        <FaqAccordion heading={item.heading} description={item.description} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.footer
                className="mt-56 lg:mt-32 text-center text-muted text-xs w-[70%] lg:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
            >
                <p>If you find any bugs, have questions or propositions feel free contact me by email:</p>
                <a  href="mailto:tima.antonuk2@gmail.com" className="text-muted hover:text-primary/80 transition-colors">
                    Email: tima.antonuk2@gmail.com
                </a>
                <p className="text-muted-foreground">Memobook, All rights reserved.</p>
            </motion.footer>
        </section>
    )
}

export default Page

