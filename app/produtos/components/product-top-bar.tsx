import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ProductTopBar() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="h-10 w-10 rounded-xl border bg-white" />

                <h1 className="font-semi-bold text-2xl">Produtos</h1>
            </div>

            <div className="flex gap-4">
                <Button variant="secondary">
                    <Plus /> Novo
                </Button>

                <Input placeholder="Pesquisar..." />
            </div>
        </div>
    );
}
