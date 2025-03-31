import type { MetaFunction } from "@remix-run/node";
import ItemList from "../components/ItemList";

export const meta: MetaFunction = () => {
  return [{ title: "The Online Store" }];
};

export default function Index() {
  return (
    <div>
      <ItemList />
    </div>
  );
}
