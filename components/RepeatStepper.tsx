export default function StepperOfRepetition({ step }: { step: number }) {
    const totalSteps = 9; // Общее количество повторений
    const normalizedStep = Math.min(step + 1, totalSteps); // Чтобы 0 отображался как 1
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

    return (
        <nav aria-label="Progress" className="flex items-center justify-center">
            <p className="font-medium">
                Repeat {normalizedStep} of {totalSteps}
            </p>
            <ol role="list" className="ml-8 flex items-center space-x-3">
                {steps.map((num) => (
                    <li key={num}>
                        {num < normalizedStep ? (
                            // Пройденные шаги (фиолетовые)
                            <span className="block size-2.5 rounded-full bg-violet-950" />
                        ) : num === normalizedStep ? (
                            // Текущий шаг (подсвеченный)
                            <span className="relative flex items-center justify-center">
                                <span aria-hidden="true" className="absolute flex size-5 p-px">
                                    <span className="size-full rounded-full bg-blue-700 opacity-20" />
                                </span>
                                <span aria-hidden="true" className="relative block size-2.5 rounded-full bg-violet-950" />
                            </span>
                        ) : (
                            // Оставшиеся шаги (серые)
                            <span className="block size-2.5 rounded-full bg-gray-200" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}