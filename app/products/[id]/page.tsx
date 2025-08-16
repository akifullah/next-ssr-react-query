import { getProduct } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { title } from "process";
import ProductClient from "./ProductClient";

// type Props = { params: { id: string | number } };

// type Params = { id: string | number };

export const generateMetadata = async ({ params }: any) => {
    const product = await getProduct(params.id);

    return {
        title: `${product.title} | Shop `,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [product.thumbnail],
        },
    };
}

export default async function ProductPage({ params }: any) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["product", params.id],
        queryFn: () => getProduct(params.id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductClient id={params.id} />
        </HydrationBoundary>
    )
}