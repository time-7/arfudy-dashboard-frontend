import { SidebarTrigger } from '@/components/ui/sidebar';

import FolderButton from './folder-button';

export default function FolderContainer() {
    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow" />

            <div className="inline-flex items-center justify-center rounded-xl border bg-neutral-100 p-[6px] text-neutral-500 shadow-sm">
                <FolderButton title="Comidas" folder="FOOD" />

                <FolderButton title="Bebidas" folder="DRINK" />

                <FolderButton title="Garçom" folder="SERVICE" />
            </div>
        </div>
    );
}
