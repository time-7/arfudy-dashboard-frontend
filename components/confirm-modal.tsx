import React, { Dispatch, SetStateAction } from 'react';

import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog';

type TConfirmModal = {
    title?: string;
    content?: string;
    open: boolean;
    onConfirm(): void;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmModal({
    title = 'Confirmar exclusão',
    content = 'Tem certeza que deseja excluir este registro?',
    open,
    onConfirm,
    onOpenChange
}: TConfirmModal) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent className="overflow-hidden border-none p-0 [&>button]:right-4 [&>button]:top-[10px] [&>button]:text-white">
                <DialogHeader className="bg-primary p-3 text-white">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="px-4">{content}</div>

                <DialogFooter className="justify-end gap-4 px-4 pb-4 sm:space-x-0">
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                    >
                        Fechar
                    </Button>

                    <Button variant="default" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
