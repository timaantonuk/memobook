"use client"

import {useToast} from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"

export default function ToastNotification() {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: "Goal successfully set.",
                    description: "Keep going bro!",
                })
            }}
        >
            Show Toast
        </Button>
    )
}
