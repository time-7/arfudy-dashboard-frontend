import { SidebarTrigger } from '@/components/ui/sidebar';

import FolderButton from './folder-button';

export default function FolderContainer() {
    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-10 w-10 rounded-xl border bg-neutral-100" />

            <div className="inline-flex items-center justify-center rounded-xl border bg-neutral-100 p-[6px] text-neutral-500 shadow-sm">
                <FolderButton title="Comidas" folder="FOOD" />

                <FolderButton title="Bebidas" folder="DRINK" />

                <FolderButton title="Garçom" folder="SERVICE" />
            </div>
        </div>
    );
}
