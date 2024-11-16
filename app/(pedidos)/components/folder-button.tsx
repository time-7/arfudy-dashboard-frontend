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
            className="block h-16 w-72 translate-y-8 transform-gpu rounded-t-2xl p-0 transition duration-300 hover:transform-none data-[open=true]:pointer-events-none data-[open=true]:transform-none"
        >
            <div className="h-8 rounded-t-2xl bg-primary" />

            <div className="bg-white h-8 leading-8">{title}</div>
        </button>
    );
}
