import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useRecordContext } from "ra-core";
import type { Order } from "@/types";

export const Totals = () => {
  const record = useRecordContext<Order>();

  return (
    <>
      <Label className="mt-2">total</Label>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>sum</TableCell>
            <TableCell className="text-right">
              {record?.total_ex_taxes.toLocaleString(undefined, {
                style: "currency",
                currency: "KSH",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>delivery</TableCell>
            <TableCell className="text-right">
              {record?.delivery_fees.toLocaleString(undefined, {
                style: "currency",
                currency: "KSH",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              taxes (
              {record?.tax_rate.toLocaleString(undefined, {
                style: "percent",
              })}
              )
            </TableCell>
            <TableCell className="text-right">
              {record?.taxes.toLocaleString(undefined, {
                style: "currency",
                currency: "KSH",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">total</TableCell>
            <TableCell className="font-bold text-right">
              {record?.total.toLocaleString(undefined, {
                style: "currency",
                currency: "KSH",
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
