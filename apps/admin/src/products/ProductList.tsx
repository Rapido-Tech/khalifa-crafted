import type { ReactNode } from "react";
import {
  List,
  ListPagination,
  NumberField,
  TextField,
  TextInput,
  ToggleFilterButton,
} from "@/components";
import {
  FilterLiveForm,
  RecordContextProvider,
  useGetList,
  useListContext,
  useRecordContext,
} from "ra-core";
import { Link } from "react-router";
import { DollarSign, ChartNoAxesColumn, Bookmark } from "lucide-react";
import { humanize } from "inflection";
import type { Product, Category } from "@/types";

export const ProductList = () => {
  return (
    <List
      perPage={24}
      pagination={
        <ListPagination
          rowsPerPageOptions={[12, 24, 48, 72]}
          className="mt-2"
        />
      }
      sort={{ field: "reference", order: "ASC" }}
    >
      <div className="flex flex-row gap-4 mb-4">
        <SidebarFilters />
        <ImageGrid />
      </div>
    </List>
  );
};

const ImageGrid = () => {
  const { isPending, error, data } = useListContext<Product>();
  if (isPending || error) {
    return null;
  }
  return (
    <div className="grid auto-rows-max grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
      {data.map((product) => (
        <RecordContextProvider key={product._id} value={product}>
          <ImageThumbnail />
        </RecordContextProvider>
      ))}
    </div>
  );
};

const ImageThumbnail = () => {
  const product = useRecordContext<Product>();
  if (!product) return null;
  return (
    <Link to={`/products/${product._id}`}>
      <div className="image-container overflow-hidden">
        <img
          // src={product.thumbnail || product.image}
          src={product.thumbnail.url}
          alt={product.description}
          className="w-full min-w-40 h-32 object-cover mb-1 transition-transform duration-300 ease-in-out hover:scale-125"
        />
      </div>
      <div className="flex flex-col gap-y-1 ">
        <TextField source="name" className="text-sm font-bold text-left" />
        <NumberField
          source="price"
          options={{
            style: "currency",
            currency: "KES",
          }}
          className="text-sm text-left font-semibold"
        />
      </div>
      {/* <TextField
        source="description"
        className="block text-sm text-left truncate"
      /> */}
    </Link>
  );
};

const SidebarFilters = () => {
  const { data } = useGetList<Category>("categories", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });
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
      <FilterCategory icon={<DollarSign size={16} />} label="Sales">
        <ToggleFilterButton
          label="Best sellers"
          value={{
            sales_lte: undefined,
            sales_gt: 25,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="Average sellers"
          value={{
            sales_lte: 25,
            sales_gt: 10,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="Low sellers"
          value={{
            sales_lte: 10,
            sales_gt: 0,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="Never sold"
          value={{
            sales_lte: undefined,
            sales_gt: undefined,
            sales: 0,
          }}
        />
      </FilterCategory>
      <FilterCategory icon={<ChartNoAxesColumn size={16} />} label="Stock">
        <ToggleFilterButton
          label="No stock"
          value={{
            stock_lt: undefined,
            stock_gt: undefined,
            stock: 0,
          }}
        />
        <ToggleFilterButton
          label="Low stock"
          value={{
            stock_lt: 10,
            stock_gt: 0,
            stock: undefined,
          }}
        />
        <ToggleFilterButton
          label="Average stock"
          value={{
            stock_lt: 50,
            stock_gt: 9,
            stock: undefined,
          }}
        />
        <ToggleFilterButton
          label="Enough stock"
          value={{
            stock_lt: undefined,
            stock_gt: 49,
            stock: undefined,
          }}
        />
      </FilterCategory>
      <FilterCategory icon={<Bookmark size={16} />} label="Categories">
        {data &&
          data.map((record) => (
            <ToggleFilterButton
              label={humanize(record.name)}
              key={record._id}
              value={{ category_id: record._id }}
            />
          ))}
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
