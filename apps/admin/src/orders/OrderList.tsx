import { useListContext } from "ra-core";
import {
  DataTable,
  List,
  ReferenceField,
  Count,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { AddressField } from "../customers/AddressField";
import { FullNameField } from "../customers/FullNameField";

const storeKeyByStatus = {
  ordered: "orders.list1",
  delivered: "orders.list2",
  cancelled: "orders.list3",
};

const filters = [
  <TextInput source="q" placeholder="Search" label={false} />,
  <ReferenceInput
    source="customer_id"
    reference="customers"
    sort={{ field: "last_name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by customer" label={false} />
  </ReferenceInput>,
];

export const OrderList = () => (
  <List
    sort={{ field: "date", order: "DESC" }}
    filterDefaultValues={{ status: "ordered" }}
    filters={filters}
    perPage={25}
  >
    <TabbedDataTable />
  </List>
);

const TabbedDataTable = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const handleChange = (value: string) => () => {
    setFilters({ ...filterValues, status: value }, displayedFilters);
  };

  return (
    <Tabs value={filterValues.status ?? "ordered"} className="mb-4 gap-2">
      <TabsList className="w-full">
        <TabsTrigger value="ordered" onClick={handleChange("ordered")}>
          Ordered{" "}
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "ordered",
              }}
            />
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="delivered" onClick={handleChange("delivered")}>
          Delivered
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "delivered",
              }}
            />
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="cancelled" onClick={handleChange("cancelled")}>
          Cancelled{" "}
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "cancelled",
              }}
            />
          </Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ordered">
        <OrdersTable storeKey={storeKeyByStatus.ordered} />
      </TabsContent>
      <TabsContent value="delivered">
        <OrdersTable storeKey={storeKeyByStatus.delivered} />
      </TabsContent>
      <TabsContent value="cancelled">
        <OrdersTable storeKey={storeKeyByStatus.cancelled} />
      </TabsContent>
    </Tabs>
  );
};

const OrdersTable = ({ storeKey }: { storeKey: string }) => (
  <DataTable storeKey={storeKey}>
    <DataTable.Col
      source="date"
      label="Date"
      render={(record) => new Date(record.date).toLocaleString()}
    />
    <DataTable.Col
      label="Reference"
      source="reference"
      className="hidden md:table-cell"
    />
    <DataTable.Col
      label="Customer"
      source="customer_id"
      className="hidden md:table-cell"
    >
      <ReferenceField source="customer_id" reference="customers" link={false}>
        <FullNameField />
      </ReferenceField>
    </DataTable.Col>
    <DataTable.NumberCol
      source="basket.length"
      label="Order Items"
      className="hidden md:table-cell"
    />
    <DataTable.NumberCol
      source="total"
      label="Total"
      options={{ style: "currency", currency: "KSH" }}
    />
    <DataTable.Col label="Address" className="hidden md:table-cell">
      <ReferenceField source="customer_id" reference="customers" link={false}>
        <AddressField />
      </ReferenceField>
    </DataTable.Col>
  </DataTable>
);
