'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Apple, HandPlatter, ReceiptText } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger
} from '@/components/ui/sidebar';

const items = [
    {
        title: 'Pedidos',
        url: '/',
        icon: ReceiptText
    },
    {
        title: 'Produtos',
        url: '/produtos',
        icon: Apple
    },
    {
        title: 'Mesas',
        url: '/mesas',
        icon: HandPlatter
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex-row">
                <SidebarTrigger />
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />

                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
