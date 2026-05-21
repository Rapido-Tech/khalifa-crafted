import { NextRequest, NextResponse } from "next/server";

const API = process.env.API_URL ?? "https://api.khalifacrafted.connectrisp.com/api/v1";

interface BasketItem {
  product_id: string;
  quantity: number;
}

interface CustomerInput {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    customer: CustomerInput;
    basket: BasketItem[];
    total: number;
  };

  const { customer, basket, total } = body;

  const custRes = await fetch(`${API}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...customer,
      has_ordered: true,
      has_newsletter: false,
      groups: [],
      nb_orders: 1,
      total_spent: total,
      last_seen: new Date().toISOString(),
      latest_purchase: new Date().toISOString(),
    }),
  });

  if (!custRes.ok) {
    return NextResponse.json({ error: "Failed to register customer" }, { status: 502 });
  }

  const cust = await custRes.json();

  const orderRes = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference: `KC-${Date.now()}`,
      customer_id: cust._id,
      basket,
      total_ex_taxes: total,
      delivery_fees: 0,
      tax_rate: 0,
      taxes: 0,
      total,
      status: "ordered",
      returned: false,
    }),
  });

  if (!orderRes.ok) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 502 });
  }

  const order = await orderRes.json();
  return NextResponse.json({ reference: order.reference, orderId: order._id });
}
