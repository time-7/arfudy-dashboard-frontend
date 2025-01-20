'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TTable } from '@/utils/validators';

import { useTableContext } from '../contexts/table-context';

export function useMutateTable() {
    const { setTables, setTableEdit } = useTableContext();

    return useMutation<any, any, TTable>({
        mutationFn: (data) =>
            data.id
                ? Axios.patch(`/tables/${data.id}`, data)
                : Axios.post('/tables', data),
        onSuccess: ({ data }, formData) => {
            if (formData.id) {
                setTables((oldTable) =>
                    oldTable.map((table) =>
                        table.id === formData.id ? formData : table
                    )
                );

                setTableEdit(formData);
            } else {
                const newTable = { ...formData, ...data.data };

                setTables((oldTable) => [...oldTable, newTable]);

                setTableEdit(newTable);
            }

            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data.message || 'Falha ao salvar a mesa'
            );
        }
    });
}
