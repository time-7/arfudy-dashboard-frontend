export type TFolder = 'DRINK' | 'FOOD' | 'SERVICE';

export type TOrderStatus = 'PENDING' | 'IN_PREPARE' | 'DONE' | 'DELIVERED';

export type TCategory = 'DRINK' | 'FOOD';

export type TOrder = {
    orderProductId: string;
    id: string;
    serviceId: string;
    clientName: string;
    tableNum: number;
    product: {
        id: string;
        name: string;
        quantity: number;
        status: TOrderStatus;
        category: TCategory;
    };
};
