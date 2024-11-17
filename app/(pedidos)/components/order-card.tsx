import { useEffect, useState } from 'react';

import { GripVertical } from 'lucide-react';

export default function OrderCard() {
    const [horario, setHorario] = useState<string>('');

    useEffect(() => setHorario(new Date().toLocaleString()), []);

    return (
        <div className="flex rounded-md border text-lg shadow-md">
            <div className="flex w-5 items-center rounded-l-md bg-gray-300">
                <GripVertical size={20} strokeWidth={1} />
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <div className="flex justify-between">
                    <p className="font-semibold">Mesa</p>

                    <p className="font-semibold">01</p>
                </div>

                <div className="flex justify-between">
                    <p className="font-semibold text-gray-400">Código</p>

                    <p className="font-semibold text-gray-400">123</p>
                </div>

                <div className="flex justify-between">
                    <p className="font-semibold text-gray-400">Data</p>

                    <p className="font-semibold text-gray-400">{horario}</p>
                </div>
            </div>
        </div>
    );
}
