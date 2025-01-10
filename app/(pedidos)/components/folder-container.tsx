import FolderButton from './folder-button';

export default function FolderContainer() {
    return (
        <div>
            <div className="inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-[6px] text-neutral-500 shadow-sm">
                <FolderButton title="Comidas" folder="FOOD" />

                <FolderButton title="Bebidas" folder="DRINK" />

                <FolderButton title="Garçom" folder="SERVICE" />
            </div>
        </div>
    );
}
