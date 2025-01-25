'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Apple, HandPlatter, LogOut, ReceiptText } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
        <Sidebar>
            <SidebarHeader className="items-center justify-center py-2">
                <Image src="/arfudy.png" width={100} height={100} alt="Logo" />
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

            <SidebarSeparator />

            <SidebarFooter>
                <SidebarMenuButton>
                    <LogOut />

                    <span>Sair</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
