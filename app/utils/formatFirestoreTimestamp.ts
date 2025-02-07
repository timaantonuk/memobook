export const formatFirestoreTimestamp = (timestamp: any): string | null => {
    if (!timestamp) return null;

    // Если `timestamp` уже строка, просто возвращаем её
    if (typeof timestamp === "string") return timestamp;

    // Если это объект Firestore (имеет `seconds`), преобразуем его в строку даты
    if (timestamp.seconds) {
        return new Date(timestamp.seconds * 1000).toISOString();
    }

    return null;
};