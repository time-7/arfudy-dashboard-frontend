import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    use,
    useEffect,
    useState
} from 'react';

import { TTable } from '@/utils/validators';

import { useQueryTables } from '../hooks/use-query-tables';

export type TTableContext = {
    isFetching: boolean;

    tables: TTable[];
    setTables: Dispatch<SetStateAction<TTable[]>>;

    tableView: TTable | null;
    setTableView: Dispatch<SetStateAction<TTable | null>>;

    tableEdit: TTable | null;
    setTableEdit: Dispatch<SetStateAction<TTable | null>>;

    showTables: boolean;
    setShowTables: Dispatch<SetStateAction<boolean>>;

    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
};

const TableContext = createContext<TTableContext>({} as TTableContext);

export function TableProvider({ children }: { children: ReactNode }) {
    const [tableView, setTableView] = useState<TTable | null>(null);
    const [tableEdit, setTableEdit] = useState<TTable | null>(null);
    const [tables, setTables] = useState<TTable[]>([]);
    const [showTables, setShowTables] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    const { data = [], isFetching, isSuccess } = useQueryTables();

    /**
     * Adiciona os produtos ao state.
     */
    const addInitialTables = () => {
        if (isSuccess) {
            setTables(data);
        }
    };

    useEffect(addInitialTables, [data]);

    return (
        <TableContext.Provider
            value={{
                isFetching,
                tables,
                setTables,
                tableView,
                setTableView,
                tableEdit,
                setTableEdit,
                showTables,
                setShowTables,
                search,
                setSearch
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export const useTableContext = (): TTableContext => use(TableContext);
