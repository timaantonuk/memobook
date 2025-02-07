export const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        console.error("Cloudinary environment variables are missing!");
        return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Cloudinary response:", data);
        return data.secure_url; // Возвращаем URL загруженного изображения
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
};
