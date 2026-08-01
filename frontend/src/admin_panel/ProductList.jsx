import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    const loadProduct = async () => {
        try {
            setLoading(true);

            const response = await api.get("/products");
            setProducts(response.data);

        } catch (error) {
            setMsg("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/delete/${id}`);

            setMsg("Product Deleted Successfully");

            // Remove deleted product immediately
            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

            setTimeout(() => {
                setMsg("");
            }, 3000);

        } catch (error) {
            setMsg("Server Error");

            setTimeout(() => {
                setMsg("");
            }, 3000);
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <div
            className="
                bg-[url('/addProductBg.png')]
                bg-cover
                bg-center
                min-h-screen
                py-6
                sm:py-8
                lg:py-10
                px-4
                sm:px-6
                lg:px-10
            "
        >

            {/* Header */}
            <div className="flex flex-col items-center">

                <div
                    className="
                        w-full
                        max-w-sm
                        bg-green-700
                        rounded-2xl
                        text-center
                        py-5
                        font-bold
                        text-xl
                        sm:text-2xl
                        text-amber-100
                        shadow-2xl
                        shadow-gray-900
                    "
                >
                    Your Products
                </div>

                <Link
                    to="/addProduct"
                    className="
                        mt-6
                        bg-amber-800
                        rounded-3xl
                        px-7
                        py-3
                        shadow-xl
                        text-amber-50
                        text-center
                        hover:bg-amber-900
                        transition
                    "
                >
                    Add Product
                </Link>

            </div>


            {/* Message */}
            {msg && (
                <p className="text-black font-medium text-center mt-5">
                    {msg}
                </p>
            )}


            {/* Loading */}
            {loading && (
                <p className="text-center mt-10 text-lg font-semibold">
                    Loading products...
                </p>
            )}


            {/* No products */}
            {!loading && products.length === 0 && (
                <div
                    className="
                        max-w-md
                        mx-auto
                        mt-10
                        p-8
                        text-center
                        bg-white/40
                        backdrop-blur-md
                        rounded-3xl
                        shadow-xl
                    "
                >
                    <p className="text-xl font-semibold">
                        No products found
                    </p>

                    <p className="mt-2">
                        Add your first product to get started.
                    </p>
                </div>
            )}


            {/* ================================= */}
            {/* MOBILE + TABLET PRODUCT CARDS */}
            {/* ================================= */}

            {!loading && (
                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                        mt-10
                        lg:grid-cols-3
                    "
                >

                    {products.map((product) => (

                        <div
                            key={product._id}
                            className="
                                bg-white/40
                                backdrop-blur-lg
                                rounded-3xl
                                shadow-xl
                                overflow-hidden
                                p-4
                            "
                        >

                            {/* Image */}
                            <div
                                className="
                                    w-full
                                    h-48
                                    sm:h-56
                                    rounded-2xl
                                    overflow-hidden
                                    bg-white/50
                                "
                            >

                                {product.image ? (

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="
                                            w-full
                                            h-full
                                            object-contain
                                        "
                                    />

                                ) : (

                                    <div
                                        className="
                                            w-full
                                            h-full
                                            flex
                                            items-center
                                            justify-center
                                            text-gray-500
                                        "
                                    >
                                        No Image
                                    </div>

                                )}

                            </div>


                            {/* Product Info */}

                            <div className="mt-4">

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        break-words
                                    "
                                >
                                    {product.title}
                                </h2>


                                <p
                                    className="
                                        text-sm
                                        text-gray-700
                                        mt-2
                                        line-clamp-3
                                    "
                                >
                                    {product.description}
                                </p>


                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-x-4
                                        gap-y-3
                                        mt-5
                                        text-sm
                                    "
                                >

                                    <div>
                                        <p className="font-semibold">
                                            Price
                                        </p>

                                        <p>
                                            ₹{product.new_price}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Old Price
                                        </p>

                                        <p>
                                            {product.old_price
                                                ? `₹${product.old_price}`
                                                : "-"
                                            }
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Quantity
                                        </p>

                                        <p>
                                            {product.quantity}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Category
                                        </p>

                                        <p className="break-words">
                                            {product.category || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Brand
                                        </p>

                                        <p>
                                            {product.brand || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Size
                                        </p>

                                        <p>
                                            {product.size || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Color
                                        </p>

                                        <p>
                                            {product.color || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="font-semibold">
                                            Weight
                                        </p>

                                        <p>
                                            {product.weight || "-"}
                                        </p>
                                    </div>

                                </div>


                                {/* Buttons */}

                                <div className="flex gap-3 mt-6">

                                    <Link
                                        to={`/editProduct/${product._id}`}
                                        className="
                                            flex-1
                                            text-center
                                            bg-blue-600
                                            text-white
                                            py-3
                                            rounded-xl
                                            hover:bg-blue-700
                                            transition
                                        "
                                    >
                                        Edit
                                    </Link>


                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="
                                            flex-1
                                            bg-red-600
                                            text-white
                                            py-3
                                            rounded-xl
                                            cursor-pointer
                                            hover:bg-red-700
                                            transition
                                        "
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}


        </div>
    );
}