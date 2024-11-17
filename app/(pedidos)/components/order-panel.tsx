import { useFolderContext } from '../contexts/FolderContext';
import OrderContainer from './order-container';

export default function OrderPanel() {
    const { currentFolder } = useFolderContext();
    const isService = currentFolder === 'SERVICE';

    return (
        <div className="z-10 flex h-[calc(100%-32px)] flex-1 gap-4 rounded-b-2xl rounded-tr-2xl border bg-white p-4 shadow-xl">
            {!isService && <OrderContainer title="Aguardando" />}

            {!isService && <OrderContainer title="Fazendo" />}

            <OrderContainer title="Pronto" />

            {isService && <OrderContainer title="Entregue" />}
        </div>
    );
}
