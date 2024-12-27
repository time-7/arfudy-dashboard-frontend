import { use } from 'react';

import PageContainer from '@/components/page-container';

export default function ProductViewPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    return <PageContainer>{id}</PageContainer>;
}
