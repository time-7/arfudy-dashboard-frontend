import { ComponentProps } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

type TProductEditIngredientModal = {
    open: ComponentProps<typeof Dialog>['open'];
    onOpenChange: ComponentProps<typeof Dialog>['onOpenChange'];
};

export default function ProductEditIngredientModal({
    open,
    onOpenChange
}: TProductEditIngredientModal) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent className="overflow-hidden border-none p-0 [&>button]:text-white">
                <DialogHeader className="flex h-12 bg-secondary-main px-4">
                    <DialogTitle className="leading-[48px] text-white">
                        Adicionar ingrediente
                    </DialogTitle>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
