export const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export const getProduct = async (id: string | number) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
        next: { revalidate: 60 }, // ISR every 60s
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}


