import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductTopBar() {
    return (
        <div className="flex items-center justify-between">
            <h1 className="font-semi-bold text-2xl">Produtos</h1>

            <div className="flex gap-4">
                <Button variant="secondary">
                    <Plus /> Novo
                </Button>

                <Input placeholder="Pesquisar..." />
            </div>
        </div>
    );
}
