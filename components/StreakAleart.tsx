import { Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function StreakAleart() {
    return (
        <div className='w-full mx-auto'>
            <Alert className='h-full flex items-center justify-center  relative'>

                <div className='sparkling'>
                    <AlertTitle className='heading-2 underline'>Heads up!</AlertTitle>
                    <AlertDescription className='heading-3'>
                        Your actual streak - 5 days 🔥
                    </AlertDescription>
                </div>
            </Alert>
        </div>


    )
}
