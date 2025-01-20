import { Loader, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function TableEditFooter({ isPending }: { isPending: boolean }) {
    return (
        <div className="sticky bottom-0 -mx-3 mt-auto">
            <div className="mt-auto flex items-center justify-end px-3">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    type="submit"
                    className="bg-primary font-bold text-white shadow-2xl shadow-primary transition-all hover:scale-105 hover:bg-primary hover:opacity-90"
                >
                    {isPending ? <Loader className="animate-spin" /> : <Save />}
                    Salvar
                </Button>
            </div>
        </div>
    );
}
