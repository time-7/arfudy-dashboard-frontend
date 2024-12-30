import { ReactNode } from 'react';

export default function PageContainer({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-2xl border bg-white p-4 shadow-xl">
            {children}
        </div>
    );
}
