// pages/api/cards.ts (или в app/api/cards/route.ts для нового роутинга в Next.js 13+)
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // убедитесь, что Prisma настроен правильно

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { cardTitle, description, category } = req.body;
            // Здесь можно добавить дополнительные проверки и валидацию, если необходимо

            const card = await prisma.card.create({
                data: {
                    title: cardTitle,
                    description: description,
                    category: category,
                    // Дополнительные поля можно вычислять на сервере, например:
                    createdAt: new Date(),
                    totalRepetitionQuantity: 9,
                    stepOfRepetition: 0,
                    nextReview: new Date(), // первое повторение сразу
                    // photoUrl: возможно, это поле оставить пустым, если загружаете фото отдельно,
                },
            });

            return res.status(200).json(card);
        } catch (error) {
            console.error("Error in API /api/cards:", error);
            return res.status(500).json({ error: "Error creating card" });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
