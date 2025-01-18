import { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TFormRow = {
    children: ReactNode;
    flexItems?: boolean;
    className?: ComponentProps<'div'>['className'];
};

export default function FormRow({
    children,
    className,
    flexItems = true
}: TFormRow) {
    return (
        <div
            className={cn(
                'flex flex-col gap-3 md:flex-row',
                flexItems ? '[&>*]:flex-1' : '',
                className
            )}
        >
            {children}
        </div>
    );
}
