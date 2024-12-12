import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface ProductProps {
    image_url: string;
    name: string;
    price: string;
}

function DataBase() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImage();
    }, []);

    async function getImage() {
        try {
            const { data, error } = await supabase.from("image").select("*");
            if (error) throw error;
            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("An error occurred while fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-auto w-full bg-white flex flex-col justify-center items-center">
            <h1 className="text-4xl mt-10">Product List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>

                                <img
                                    className=" mt-10 h-[50] w-[20vw] bg-red-500"
                                    src={product.image_url} alt={product.name || "Product"} />
                           
                            <div>
                                <p className="text-xl font-bold">{product.price}</p>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default DataBase;
