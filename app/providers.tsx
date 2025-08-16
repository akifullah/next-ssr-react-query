"use client";

import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { useState } from "react";


export default function Providers({ children, dehydratedState }: any) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // keep data fresh for 1 min
                gcTime: 5 * 60 * 1000,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            },
        },
    }));
    // hydrate(queryClient, dehydratedState);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}