import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqAccordion({heading, description}) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>{heading}</AccordionTrigger>
                <AccordionContent>
                    {description}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
