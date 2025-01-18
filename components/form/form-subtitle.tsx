import { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TFormTitle = {
    children: ReactNode;
    className?: ComponentProps<'h1'>['className'];
};

export default function FormSubTitle({ children, className }: TFormTitle) {
    return (
        <h2 className={cn('mt-4 text-lg font-bold', className)}>{children}</h2>
    );
}
