import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function StreakAlert() {
    return (
        <div className='w-full mx-auto'>
            <Alert className='h-full flex items-center justify-center  relative'>

                <div className='sparkling'>
                    <AlertTitle className='text-xl lg:text-3xl underline'>Heads up!</AlertTitle>
                    <AlertDescription className='lg:text-2xl'>
                        Your actual streak - 5 days 🔥
                    </AlertDescription>
                </div>
            </Alert>
        </div>


    )
}
