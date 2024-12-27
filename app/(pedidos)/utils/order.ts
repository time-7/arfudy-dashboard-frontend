import { TOrderStatus } from '../types';

export const ordersInfos: Record<
    TOrderStatus,
    { color: string; name: string }
> = {
    DELIVERED: {
        color: 'terciary',
        name: 'Entregue'
    },
    DONE: {
        color: 'primary',
        name: 'Pronto'
    },
    IN_PREPARE: {
        color: 'secondary',
        name: 'Fazendo'
    },
    PENDING: {
        color: 'quaternary',
        name: 'Aguardando'
    }
};
