"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/CardWrapper";
import dynamic from "next/dynamic";
import {ImageDown} from "lucide-react";

// Import MDEditor dynamically (to avoid SSR issues)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    description: z.string().optional(),
});

const CardForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            description: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <CardWrapper width="w-[95%] mx-auto py-10 px-4 lg:w-full lg:p-10">
                <h1 className="heading-1 mb-10">Create Card</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Name</FormLabel>
                                <FormControl>
                                    <Input className="h-12" placeholder="My first card" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                            className="pl-5 absolute inset-0 flex items-center gap-2 justify-start cursor-grab text-accent-foreground opacity-65  ">
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Description (optional)</FormLabel>
                                <FormControl>
                                    <MDEditor value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="h-12" type="submit">
                        Create
                    </Button>
                </form>
            </CardWrapper>
        </Form>
    );
};

export default CardForm;
