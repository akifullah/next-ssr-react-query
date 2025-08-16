"use client"
import { getProduct } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProductClient = ({ id }: { id: string | number }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id)
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="max-w-md mx-auto p-6 border rounded-xl shadow">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <img src={data.thumbnail} alt={data.title} className="rounded-lg my-3" />
                <p className="text-gray-700">{data.description}</p>
                <p className="mt-2 text-lg font-semibold">${data.price}</p>
                <p className="text-sm text-gray-500">Brand: {data.brand}</p>
            </div>
        </>
    )
}

export default ProductClient