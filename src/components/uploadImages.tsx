import { useState } from "react";
import { supabase } from '../supabaseClient';

const UploadImages = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [fileURL, setFileURL] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setError(null);
        }
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            setError(null);
            
            if (!file) {
                setError("Please select a file");
                return;
            }

            const fileExt = file.name.split(".").pop();
            const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('Image')
                .upload(uniqueFileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data } = await supabase.storage
                .from("Image")
                .getPublicUrl(uniqueFileName);

            if (data) {
                setFileURL(data.publicUrl);
                alert('File uploaded successfully!');
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`Error uploading file: ${error.message}`);
                console.error('Upload error:', error);
            } else {
                setError("An unknown error occurred.");
                console.error('Unknown upload error:', error);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-10">
            <div className="flex gap-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="cursor-pointer text-white"
                    disabled={uploading}
                />
                <button 
                    onClick={handleUpload} 
                    disabled={uploading || !file}
                    className="text-white px-5 py-2 bg-green-500 disabled:bg-green-800 rounded"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
            
            {error && (
                <div className="text-red-500 mt-2 p-2 bg-red-100 rounded">{error}</div>
            )}
            
            {fileURL && (
                <div className="mt-4">
                    <img 
                        src={fileURL} 
                        alt="Uploaded preview" 
                        className="max-w-[300px] rounded-lg"
                    />
                    <p className="text-white mt-2 break-all text-sm">
                        Uploaded URL: {fileURL}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadImages;
