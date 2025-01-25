'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TTable } from '@/utils/validators';

import { useTableContext } from '../contexts/table-context';

export function useDeleteTable() {
    const { setTables, setTableEdit, setTableView, tableEdit, tableView } =
        useTableContext();

    /**
     * Remove a mesa da lista e fecha a tela de edit ou view.
     */
    const onSuccessDelete = (table: TTable) => {
        setTables((oldTables) =>
            oldTables.filter((oldTable) => table.id !== oldTable.id)
        );

        if (tableEdit?.id === table.id) {
            setTableEdit(null);
        } else if (tableView?.id === table.id) {
            setTableView(null);
        }
    };

    return useMutation<any, any, TTable>({
        mutationFn: (data) => Axios.delete(`/tables/${data.id}`),
        onSuccess: ({ data }, formData) => {
            onSuccessDelete(formData);

            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data.message || 'Falha ao salvar a mesa'
            );
        }
    });
}
