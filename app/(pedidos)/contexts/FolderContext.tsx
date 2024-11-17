import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    use,
    useState
} from 'react';

import { TFolder } from '../types';

export type TFolderContext = {
    currentFolder: TFolder;
    setCurrentFolder: Dispatch<SetStateAction<TFolder>>;
};

const FolderContext = createContext<TFolderContext>({} as TFolderContext);

export function FolderProvider({ children }: { children: ReactNode }) {
    const [currentFolder, setCurrentFolder] = useState<TFolder>('FOOD');

    return (
        <FolderContext.Provider
            value={{
                currentFolder,
                setCurrentFolder
            }}
        >
            {children}
        </FolderContext.Provider>
    );
}

export const useFolderContext = (): TFolderContext => use(FolderContext);
