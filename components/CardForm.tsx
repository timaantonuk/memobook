"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {ImageDown} from "lucide-react";
import CardWrapper from "@/components/CardWrapper";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


const CardForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            description: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <CardWrapper width='w-full p-10'>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Name</FormLabel>
                                <FormControl>
                                    <Input className='h-12' placeholder="My first card" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>


                        )}
                    />

                    <FormField
                        control={form.control}
                        name="photo"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Photo (optional)</FormLabel>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            className="h-12 flex items-center pl-20 file:hidden text-transparent w-full"
                                            type="file"
                                            {...field}
                                        />
                                        <FormLabel
                                            className="pl-5 absolute inset-0 flex items-center gap-2 justify-start cursor-grab  text-secondary">
                                            <span>Choose File</span>
                                            <ImageDown/>
                                        </FormLabel>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>


                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Description (optional)</FormLabel>
                                <FormControl>
                                    <Textarea className='h-36 resize-none overflow-y-auto'
                                              placeholder="My first card" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>


                        )}
                    />
                    <Button className='h-12' type="submit">Create</Button>
                </form>

            </CardWrapper>

        </Form>
    )
}

export default CardForm;
