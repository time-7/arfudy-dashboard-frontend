'use client';

import { useOrderContext } from '../contexts/order-context';
import { TFolder } from '../types';

type TFolderButton = {
    folder: TFolder;
    title: string;
};

export default function FolderButton({ folder, title }: TFolderButton) {
    const { currentFolder, setCurrentFolder } = useOrderContext();
    const open = folder === currentFolder;

    return (
        <button
            data-open={open}
            onClick={() => setCurrentFolder(folder)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 data-[open=true]:bg-white data-[open=true]:text-neutral-950 data-[open=true]:shadow"
        >
            {title}
        </button>
    );
}
