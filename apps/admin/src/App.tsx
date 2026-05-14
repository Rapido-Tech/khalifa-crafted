import "@/App.css";
import "normalize.css";
import { Admin } from "./components";
import { dataProvider } from "@/dataProvider.ts";
import { Resource } from "ra-core";
import { orders } from "@/orders";
import { Dashboard } from "@/dashboard/Dashboard";
import { products } from "@/products";
import { categories } from "@/categories";
import { customers } from "@/customers";
import { reviews } from "@/reviews";
import authProvider from "./authProvider";

function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
    >
      <Resource {...orders} />
      <Resource {...products} />
      <Resource {...categories} />
      <Resource {...customers} />
      <Resource {...reviews} />
    </Admin>
  );
}

export default App;
