import FolderButton from './folder-button';

export default function FolderContainer() {
    return (
        <div className="flex h-8 flex-col gap-2">
            <FolderButton title="Comidas" folder="FOOD" />

            <FolderButton title="Bebidas" folder="DRINK" />

            <FolderButton title="Garçom" folder="SERVICE" />
        </div>
    );
}
