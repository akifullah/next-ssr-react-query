import { getProducts } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey:["products"],
        queryFn: getProducts,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductsClient/>
        </HydrationBoundary>
    )

}