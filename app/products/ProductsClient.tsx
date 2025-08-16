"use client";
import { getProducts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

const ProductsClient = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {data.products.map((p: any) => (
                    <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <img src={p.thumbnail} alt={p.title} className="rounded-lg" />
                        <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
                        <p className="text-gray-600">${p.price}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default ProductsClient