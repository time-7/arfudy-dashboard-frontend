import { TOrder } from '@/types';

type TOrderModal = {
  order: TOrder;
};

export default function OrderModal({ order }: TOrderModal) {
  return <div>order-modal</div>;
}
