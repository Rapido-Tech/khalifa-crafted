import type { ReactNode } from "react";
import { FilterLiveForm } from "ra-core";
import {
  DataTable,
  List,
  ToggleFilterButton,
  TextInput,
  ListPagination,
} from "@/components";

import { Clock, DollarSign, Mail } from "lucide-react";
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
} from "date-fns";

import { FullNameField } from "./FullNameField";
import { useIsMobile } from "@/hooks/use-mobile";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
const smallDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

export const CustomerList = () => {
  const isMobile = useIsMobile();

  return (
    <List
      perPage={25}
      sort={{ field: "last_seen", order: "DESC" }}
      pagination={false}
    >
      <div className="flex flex-row gap-4 mb-4">
        <SidebarFilters />
        <div className="lg:w-4xl">
          <DataTable>
            <DataTable.Col label="Name" source="last_name">
              <FullNameField />
            </DataTable.Col>
            <DataTable.Col
              source="nb_orders"
              label="Orders"
              className="hidden md:table-cell text-right"
              render={(record) =>
                record.nb_orders > 0 ? record.nb_orders : ""
              }
            />
            <DataTable.NumberCol
              source="total_spent"
              options={{ style: "currency", currency: "KSH" }}
              conditionalClassName={(record) =>
                record.total_spent > 500 && "dark:text-green-500 text-lime-700"
              }
              label="Total Spent"
              className="hidden md:table-cell"
            />
            <DataTable.Col
              source="last_seen"
              label="Last Seen"
              render={(record) =>
                isMobile
                  ? smallDateTimeFormatter.format(new Date(record.last_seen))
                  : dateTimeFormatter.format(new Date(record.last_seen))
              }
            />
          </DataTable>
          <ListPagination className="justify-start mt-2" />
        </div>
      </div>
    </List>
  );
};

const SidebarFilters = () => {
  return (
    <div className="min-w-48 hidden md:block">
      <FilterLiveForm>
        <TextInput
          source="q"
          placeholder="search"
          label={false}
          className="mb-6"
        />
      </FilterLiveForm>
      <FilterCategory icon={<Clock size={16} />} label="last visited">
        <ToggleFilterButton
          label="today"
          value={{
            last_seen_gte: endOfYesterday().toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="this week"
          value={{
            last_seen_gte: startOfWeek(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="last week"
          value={{
            last_seen_gte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
            last_seen_lte: startOfWeek(new Date()).toISOString(),
          }}
        />
        <ToggleFilterButton
          label="this month"
          value={{
            last_seen_gte: startOfMonth(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="last month"
          value={{
            last_seen_gte: subMonths(startOfMonth(new Date()), 1).toISOString(),
            last_seen_lte: startOfMonth(new Date()).toISOString(),
          }}
        />
        <ToggleFilterButton
          label="earlier"
          value={{
            last_seen_gte: undefined,
            last_seen_lte: subMonths(startOfMonth(new Date()), 1).toISOString(),
          }}
        />
      </FilterCategory>
      <FilterCategory icon={<DollarSign size={16} />} label="has ordered">
        <ToggleFilterButton
          label="true"
          value={{
            nb_orders_gte: 1,
            nb_orders_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="false"
          value={{
            nb_orders_gte: undefined,
            nb_orders_lte: 0,
          }}
        />
      </FilterCategory>
      <FilterCategory icon={<Mail size={16} />} label="has newsletter">
        <ToggleFilterButton label="true" value={{ has_newsletter: true }} />
        <ToggleFilterButton label="false" value={{ has_newsletter: false }} />
      </FilterCategory>
    </div>
  );
};

const FilterCategory = ({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children?: ReactNode;
}) => (
  <>
    <h3 className="flex flex-row items-center gap-2 mb-1 font-bold text-sm">
      {icon}
      {label}
    </h3>
    <div className="flex flex-col items-start ml-3 mb-4">{children}</div>
  </>
);
