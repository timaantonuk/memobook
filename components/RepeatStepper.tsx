interface StepperOfRepetitionProps {
    step: number
}

export default function StepperOfRepetition({ step }: StepperOfRepetitionProps) {
    const totalSteps = 9
    const normalizedStep = Math.min(step + 1, totalSteps)
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)

    return (
        <nav aria-label="Progress" className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center justify-center">
            <p className="font-medium text-sm">
                Repeat {normalizedStep} of {totalSteps}
            </p>
            <ol role="list" className="lg:ml-3 flex items-center space-x-1 lg:space-x-3">
                {steps.map((num) => (
                    <li key={num}>
                        {num < normalizedStep ? (
                            <span className="block size-2 lg:size-2.5 rounded-full bg-violet-950" />
                        ) : num === normalizedStep ? (
                            <span className="relative flex items-center justify-center">
                <span aria-hidden="true" className="absolute flex size-5 p-px">
                  <span className="size-full rounded-full bg-blue-700 opacity-20" />
                </span>
                <span aria-hidden="true" className="relative block size-2.5 rounded-full bg-violet-950" />
              </span>
                        ) : (
                            <span className="block size-2 lg:size-2.5 rounded-full bg-gray-200" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

