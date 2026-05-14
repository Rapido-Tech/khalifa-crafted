/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useGetMany, useRecordContext } from "ra-core";
import { Link } from "react-router";
import type { Order, Product } from "@/types";

export const Basket = () => {
  const record = useRecordContext<Order>();

  const productIds = record ? record.basket.map((item) => item.product_id) : [];

  const { isPending, data: products } = useGetMany<Product>(
    "products",
    { ids: productIds },
    { enabled: !!record }
  );
  const productsById = products
    ? products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {} as any)
    : {};

  if (isPending || !record || !products) return null;

  return (
    <>
      <Label className="mt-2">items</Label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>reference</TableHead>
            <TableHead className="text-right">unit price</TableHead>
            <TableHead className="text-right">quantity</TableHead>
            <TableHead className="text-right">total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {record.basket.map((item: any) => (
            <TableRow key={item.product_id}>
              <TableCell>
                <Link to={`/products/${item.product_id}`}>
                  {productsById[item.product_id].reference}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                {productsById[item.product_id].price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "KES",
                })}
              </TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {(
                  productsById[item.product_id].price * item.quantity
                ).toLocaleString(undefined, {
                  style: "currency",
                  currency: "KES",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
