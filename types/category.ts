export interface Category {
    id: string
    name: string
    userId: string
}

export interface CategorySelectProps {
    value?: string
    onValueChange: (value: string) => void
    className?: string
    placeholder?: string
}

