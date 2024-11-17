import OrderCard from './order-card';

type TOrderContainer = {
    title: string;
};

export default function OrderContainer({ title }: TOrderContainer) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="text-md h-10 rounded-t-2xl bg-primary text-center font-semibold leading-10 text-white">
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
