"use client"
import { motion } from "framer-motion"
import FaqAccordion from "@/components/FaqAccordion"

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
                {[...Array(5)].map((_, i) => (
                    <motion.div key={i} variants={itemVariants} custom={i} className="w-full">
                        <FaqAccordion />
                    </motion.div>
                ))}
            </motion.div>

            <motion.footer
                className="bottom-0 right-1/2 translate-x-40 mt-32 text-center text-muted text-xs"
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

