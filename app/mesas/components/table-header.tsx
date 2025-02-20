import { Eye, EyeClosed, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { useTableContext } from '../contexts/table-context';

export default function TableHeader() {
    const {
        tableEdit,
        tableView,
        showTables,
        setShowTables,
        setTableEdit,
        tables,
        search,
        setSearch
    } = useTableContext();

    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow" />

            <div className="flex gap-4">
                <Button
                    variant="secondary"
                    onClick={() =>
                        setTableEdit({
                            seatNum: 1,
                            tableNum: (tables.at(-1)?.tableNum || 0) + 1,
                            activeToken: null
                        })
                    }
                >
                    <Plus /> Novo
                </Button>

                <Input
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={(value) => setSearch(value.target.value)}
                />

                {(tableEdit || tableView) && (
                    <Button
                        variant="secondary"
                        className="p-2 px-2.5"
                        onClick={() => setShowTables(!showTables)}
                    >
                        {showTables ? (
                            <EyeClosed className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
