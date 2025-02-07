// 'use client'
// import React, {useEffect, useState} from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
//
// const SwipeCards = () => {
//
//
//
//     const [cards, setCards] = useState(cardData);
//     const [decision, setDecision] = useState(null); // learning | forget | null
//
//
//     useEffect(()=>{
//         console.log(decision)
//     }, [decision])
//
//     return (
//         <div
//             className="grid h-[500px] w-full place-items-center bg-neutral-100"
//             style={{
//                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
//             }}
//         >
//             {cards.map((card) => {
//                 return (
//                     <Card
//                         key={card.id}
//                         cards={cards}
//                         setCards={setCards}
//                         setDecision={setDecision}
//                         {...card}
//                     />
//                 );
//             })}
//
//             {decision && (
//                 <div className="absolute bottom-5 text-xl font-bold text-gray-700">
//                     {decision === "learning" ? "📚 Learning" : "🗑 Forget"}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// const Card = ({ id, url, setCards, cards, setDecision }) => {
//     const x = useMotionValue(0);
//
//     // Прозрачность почти не меняется, но резко исчезает в самом конце
//     const opacity = useTransform(x, [-200, -120, 0, 120, 200], [0, 1, 1, 1, 0]);
//     const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
//
//     const isFront = id === cards[cards.length - 1].id;
//
//     const rotate = useTransform(() => {
//         const offset = isFront ? 0 : id % 2 ? 6 : -6;
//         return `${rotateRaw.get() + offset}deg`;
//     });
//
//     const handleDragEnd = () => {
//         const finalX = x.get();
//
//         if (finalX < -100) {
//             setDecision("learning");
//         } else if (finalX > 100) {
//             setDecision("forget");
//         }
//
//         if (Math.abs(finalX) > 100) {
//             setTimeout(() => {
//                 setCards((prev) => prev.filter((card) => card.id !== id));
//                 setDecision(null);
//             }, 300);
//         }
//     };
//
//     return (
//         <motion.img
//             src={url}
//             alt="Placeholder alt"
//             className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
//             style={{
//                 gridRow: 1,
//                 gridColumn: 1,
//                 x,
//                 opacity,
//                 rotate,
//                 transition: "0.125s transform",
//                 boxShadow: isFront
//                     ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
//                     : undefined,
//             }}
//             layout
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, scale: isFront ? 1 : 0.98 }}
//             drag="x"
//             dragConstraints={false}
//             onDragEnd={handleDragEnd}
//         />
//     );
// };
//
// export default SwipeCards;
//
// const cardData = [
//     {
//         id: 1,
//         url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop",
//     },
//     {
//         id: 2,
//         url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop",
//     },
//     {
//         id: 3,
//         url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop",
//     },
//     {
//         id: 4,
//         url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop",
//     },
//     {
//         id: 5,
//         url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop",
//     },
//     {
//         id: 6,
//         url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop",
//     },
//     {
//         id: 7,
//         url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop",
//     },
//     {
//         id: 8,
//         url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop",
//     },
// ];
