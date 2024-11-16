import OrderCard from './order-card';

type TOrderContainer = {
    title: string;
};

export default function OrderContainer({ title }: TOrderContainer) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="text-white h-16 rounded-t-2xl bg-primary text-center text-lg font-semibold leading-[64px]">
                {title}
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-b-2xl border p-4">
                {Array.from({ length: 1 }).map((_, i) => (
                    <OrderCard key={i} />
                ))}
            </div>
        </div>
    );
}
