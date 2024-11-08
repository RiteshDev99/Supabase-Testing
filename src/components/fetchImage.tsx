import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Card from "./card";


const FetchImage = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: fileList, error: listError } = await supabase.storage
                .from("Image")
                .list();

            if (listError) {
                throw listError;
            }

            if (!fileList?.length) {
                setError("No images found");
                return;
            }

            const imageUrls = await Promise.all(
                fileList.map(async (file) => {
                    const { data } = await supabase.storage
                        .from("Image")
                        .getPublicUrl(file.name);
                    return data.publicUrl;
                })
            );

            setImages(imageUrls);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`Error fetching images: ${error.message}`);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="flex flex-col items-center mt-10">
            <button
                onClick={fetchImages}
                disabled={loading}
                className="px-5 py-2 bg-blue-500 text-white rounded disabled:bg-blue-800"
            >
                {loading ? "Loading..." : "Refresh Images"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="grid grid-cols-2 gap-4 mt-8">
                {images.map((url, index) => {
                    console.log("Image URL:", url)
                    return (
                        <div key={index} className="flex flex-col items-center">
                            <Card Image={url} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FetchImage;
