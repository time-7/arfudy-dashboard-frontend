import { TOrderStatus } from '../types';

export const ordersInfos: Record<
    TOrderStatus,
    {
        title: string;
        backgroundColor: string;
        backgroundColorChip: string;
        textColor: string;
        borderColor: string;
    }
> = {
    PENDING: {
        title: 'Aguardando',
        backgroundColor: 'bg-quaternary',
        backgroundColorChip: 'bg-quaternary/20',
        textColor: 'text-quaternary',
        borderColor: 'border-squaternary'
    },
    IN_PREPARE: {
        title: 'Fazendo',
        backgroundColor: 'bg-secondary-main',
        backgroundColorChip: 'bg-secondary-main/20',
        textColor: 'text-secondary-main',
        borderColor: 'border-secondary-main'
    },
    DONE: {
        title: 'Pronto',
        backgroundColor: 'bg-primary',
        backgroundColorChip: 'bg-primary/20',
        textColor: 'text-primary',
        borderColor: 'border-primary'
    },
    DELIVERED: {
        title: 'Entregue',
        backgroundColor: 'bg-terciary',
        backgroundColorChip: 'bg-terciary/20',
        textColor: 'text-terciary',
        borderColor: 'border-terciary'
    }
};
