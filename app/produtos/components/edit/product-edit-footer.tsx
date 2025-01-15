import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ProductEditFooter() {
    return (
        <div className="mt-auto flex items-center justify-end bg-secondary-main px-3 py-3">
            <Button  variant="secondary">
                <Save /> Salvar
            </Button>
        </div>
    );
}
