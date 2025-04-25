"use client";

import Sidebar from '@/components/sidebar';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Wrapper({ children }) {
    const queryClient = new QueryClient()
    const pathname = usePathname();

    const hideSidebarRoutes = ['/login', '/register'];

    const showSidebar = !hideSidebarRoutes.includes(pathname);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {showSidebar ? <Sidebar>{children}</Sidebar> : children}
            </QueryClientProvider>
        </>
    );
}