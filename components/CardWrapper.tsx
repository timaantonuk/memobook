import { Card } from "@/components/ui/card"
import React, { ReactNode } from "react"

interface CardWrapperProps {
    children: ReactNode
    width?: string
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, width }) => {
    return <Card className={width}>{children}</Card>
}

export default CardWrapper
