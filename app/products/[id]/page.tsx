import { getProduct } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { title } from "process";
import ProductClient from "./ProductClient";

type Params = { id: string };

interface PageProps {
    params: Promise<Params>;
}

export const generateMetadata = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);

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

export default async function ProductPage({ params }: PageProps) {
    const resolvedParams = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["product", resolvedParams.id],
        queryFn: () => getProduct(resolvedParams.id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductClient id={resolvedParams.id} />
        </HydrationBoundary>
    )
}