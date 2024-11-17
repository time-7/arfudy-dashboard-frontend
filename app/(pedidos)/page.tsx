'use client';

import { useState } from 'react';

import FolderButton, { TFolder } from './components/folder-button';
import OrderContainer from './components/order-container';

export default function Home() {
    const [currentFolder, setCurrentFolder] = useState<TFolder>('FOOD');
    const isService = currentFolder === 'SERVICE';

    return (
        <>
            <div className="flex h-8 gap-2">
                <FolderButton
                    title="Comidas"
                    folder="FOOD"
                    currentFolder={currentFolder}
                    setCurrentFolder={setCurrentFolder}
                />

                <FolderButton
                    title="Bebidas"
                    folder="DRINK"
                    currentFolder={currentFolder}
                    setCurrentFolder={setCurrentFolder}
                />

                <FolderButton
                    title="Garçom"
                    folder="SERVICE"
                    currentFolder={currentFolder}
                    setCurrentFolder={setCurrentFolder}
                />
            </div>

            <div className="z-10 flex h-[calc(100%-32px)] flex-1 gap-4 rounded-b-2xl rounded-tr-2xl border bg-white p-4 shadow-xl">
                {!isService && <OrderContainer title="Aguardando" />}

                {!isService && <OrderContainer title="Fazendo" />}

                <OrderContainer title="Pronto" />

                {isService && <OrderContainer title="Entregue" />}
            </div>
        </>
    );
}
