'use client';

import { Dispatch, SetStateAction } from 'react';

export type TFolder = 'DRINK' | 'FOOD' | 'SERVICE';

type TFolderButton = {
    folder: TFolder;
    title: string;
    currentFolder: TFolder;
    setCurrentFolder: Dispatch<SetStateAction<TFolder>>;
};

export default function FolderButton({
    folder,
    title,
    currentFolder,
    setCurrentFolder
}: TFolderButton) {
    const open = folder === currentFolder;

    return (
        <button
            data-open={open}
            onClick={() => setCurrentFolder(folder)}
            className="block h-16 w-72 transform-gpu rounded-t-2xl p-0 transition duration-300 hover:-translate-y-[31px] data-[open=true]:pointer-events-none data-[open=true]:z-20 data-[open=true]:-translate-y-[31px]"
        >
            <div className="h-8 rounded-t-2xl bg-primary" />

            <div className="h-8 border-x bg-white font-semibold leading-8">
                {title}
            </div>
        </button>
    );
}
