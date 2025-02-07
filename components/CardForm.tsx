"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CardWrapper from "@/components/CardWrapper";
import dynamic from "next/dynamic";
import {ImageDown} from "lucide-react";
import {uploadToCloudinary} from "@/app/utils/functions";
import {useCardStore} from "@/app/store/card-store";
import {useUserStore} from "@/app/store/user-store";
import CategorySelect from "@/components/CategorySelect";
import {createCard} from "@/app/utils/cardsService";
import {useUser} from "@clerk/nextjs";

// Import MDEditor dynamically (to avoid SSR issues)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {ssr: false});

const formSchema = z.object({
    cardTitle: z.string().min(2, {message: "Username must be at least 2 characters."}),
    description: z.string().optional(),
    category: z.string().min(1, { message: "Category is required." }),
    photo: z.instanceof(File).optional(), // Отдельное поле для файла

});

const CardForm = () => {
    const userId = useUserStore((state)=>state.id)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardTitle: "",
            description: "",
            category: "",
            photo: undefined, // Отдельное поле для файла
        },
    });
    const handleCreateCard = async (file: File, values: any) => {
        try {
            // Загружаем фото, если файл передан
            const photoUrl = file ? await uploadToCloudinary(file) : "";

            // Формируем данные карточки для Firebase
            const cardData = {
                title: values.cardTitle,
                description: values.description,
                category: values.category,
                photoUrl,
                userId: userId,
            };

            console.log("🎯 Созданная карточка:", {
                title: values.cardTitle,
                category: values.category, // Вот это важно!
                userId: userId,
            });

            // Создаем карточку в Firebase
            const createdCard = await createCard(cardData);

            // Обновляем Zustand store, добавляя созданную карточку
            useCardStore.getState().addCard(createdCard);

            console.log("Card created in Firebase and pushed to store", createdCard);
            console.log("Current card state", useCardStore.getState());
            console.log("User state", useUserStore.getState());
        } catch (error) {
            console.error("Error creating card", error);
            throw error;
        }


    };
    function onSubmit(values: z.infer<typeof formSchema>) {
        handleCreateCard(values.photo, values).then(() => console.log("Card creation completed")
        )
        form.reset()
    }

    return (
        <Form {...form}>
            <CardWrapper width="w-[95%] mx-auto py-10 px-4 lg:w-full lg:p-10">
                <h1 className="heading-1 mb-10">Create Card</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="cardTitle"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Name</FormLabel>
                                <FormControl>
                                    <Input className="h-12" placeholder="My first card" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <CategorySelect className="h-12" placeholder="New category" {...field} value={field.value}
                                                    onValueChange={field.onChange} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Поле для загрузки фото */}
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Photo (optional)</FormLabel>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            id='file'
                                            className="h-12 flex items-center pl-20 file:hidden text-accent-foreground w-full"
                                            type="file"
                                            onChange={(e) => field.onChange(e.target.files?.[0])} // Обновляем state только файлом
                                        />
                                        <FormLabel
                                            htmlFor='file'
                                            className="pl-5 absolute inset-0 flex items-center gap-2 cursor-pointer justify-start opacity-65">
                                            <span>Choose File</span>
                                            <ImageDown/>
                                        </FormLabel>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Поле для Markdown Editor */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Description (optional)</FormLabel>
                                <FormControl>
                                    <MDEditor value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
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

