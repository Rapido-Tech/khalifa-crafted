import { Card, CardContent } from "@/components/ui/card";

import { PendingOrder } from "./PendingOrder";
import type { Order } from "@/types";

interface Props {
  orders?: Order[];
}

const PendingOrders = (props: Props) => {
  const { orders = [] } = props;

  return (
    <Card className="flex-1">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-xl">pending orders</h2>
        {orders.map((record) => (
          <PendingOrder key={record.id} order={record} />
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingOrders;
