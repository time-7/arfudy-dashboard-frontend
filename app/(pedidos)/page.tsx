'use client';

import FolderContainer from './components/folder-container';
import OrderPanel from './components/order-panel';
import { FolderProvider } from './contexts/FolderContext';

export default function Home() {
    return (
        <FolderProvider>
            <FolderContainer />

            <OrderPanel />
        </FolderProvider>
    );
}
