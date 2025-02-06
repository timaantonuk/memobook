const steps = [
    { name: 'Repeat 1', href: '#', status: 'complete' },
    { name: 'Repeat 2', href: '#', status: 'current' },
    { name: 'Repeat 3', href: '#', status: 'upcoming' },
    { name: 'Repeat 4', href: '#', status: 'upcoming' },
]

export default function RepeatStepper() {
    return (
        <nav aria-label="Progress" className="flex items-center justify-center">
            <p className=" font-medium">
                Repeat {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
            </p>
            <ol role="list" className="ml-8 flex items-center space-x-5">
                {steps.map((step) => (
                    <li key={step.name}>
                        {step.status === 'complete' ? (
                            <a href={step.href} className="block size-2.5 rounded-full bg-violet-950 hover:bg-muted">
                                <span className="sr-only">{step.name}</span>
                            </a>
                        ) : step.status === 'current' ? (
                            <a href={step.href} aria-current="step" className="relative flex items-center justify-center">
                <span aria-hidden="true" className="absolute flex size-5 p-px">
                  <span className="size-full rounded-full bg-blue-700 opacity-20" />
                </span>
                                <span aria-hidden="true" className="relative block size-2.5 rounded-full bg-violet-950 " />
                                <span className="sr-only">{step.name}</span>
                            </a>
                        ) : (
                            <a href={step.href} className="block size-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                                <span className="sr-only">{step.name}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
