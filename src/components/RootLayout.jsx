import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
