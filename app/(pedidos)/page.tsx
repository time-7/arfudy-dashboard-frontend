'use client';

import FolderContainer from './components/folder-container';
import OrderPanel from './components/order-panel';
import { OrderProvider } from './contexts/order-context';

export default function OrderPage() {
    return (
        <OrderProvider>
            <FolderContainer />

            <OrderPanel />
        </OrderProvider>
    );
}
