import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ProductTopBar() {
    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow" />

            <div className="flex gap-4">
                <Button variant="secondary">
                    <Plus /> Novo
                </Button>

                <Input placeholder="Pesquisar..." />
            </div>
        </div>
    );
}
