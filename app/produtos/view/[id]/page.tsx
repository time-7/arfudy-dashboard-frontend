'use client';

import { use } from 'react';

import Loading from '@/components/loader';
import PageContainer from '@/components/page-container';

import { useQueryProduct } from './hooks/use-query-product';

export default function ProductViewPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { data, isFetching } = useQueryProduct({ id });

    return (
        <PageContainer>
            {isFetching && <Loading />}

            {data && <h2 className="text-2xl font-semibold">{data.name}</h2>}
        </PageContainer>
    );
}
