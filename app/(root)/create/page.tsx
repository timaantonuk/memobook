"use client"
import { motion } from "framer-motion"
import Categories from "@/components/Categories"
import CardForm from "@/components/CardForm"

const Page = () => {
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.75,
            },
        },
    }

    return (
        <motion.section
            className="main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[2fr_1fr] gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <CardForm />
            </motion.div>
            <motion.div variants={itemVariants}>
                <Categories />
            </motion.div>
        </motion.section>
    )
}

export default Page

