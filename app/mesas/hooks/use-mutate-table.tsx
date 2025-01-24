'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TTable } from '@/utils/validators';

import { useTableContext } from '../contexts/table-context';

export function useMutateTable() {
    const { setTables, setTableEdit } = useTableContext();

    /**
     * Altera os dados na lista e atualiza os dados no state de edit.
     */
    const onSuccessEdit = (table: TTable) => {
        setTables((oldTables) =>
            oldTables.map((oldTable) => (table.id === oldTable.id ? table : oldTable))
        );

        setTableEdit(table);
    };

    /**
     * Adiciona a nova mesa na lista de mesas e salva os dados no state de edit.
     */
    const onSuccessSave = (table: TTable) => {
        setTables((oldTable) => [...oldTable, table]);

        setTableEdit(table);
    };

    return useMutation<any, any, TTable>({
        mutationFn: (data) =>
            data.id
                ? Axios.patch(`/tables/${data.id}`, data)
                : Axios.post('/tables', data),
        onSuccess: ({ data }, formData) => {
            const newTable = { ...formData, ...data.data };

            if (formData.id) {
                onSuccessEdit(newTable);
            } else {
                onSuccessSave(newTable);
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
