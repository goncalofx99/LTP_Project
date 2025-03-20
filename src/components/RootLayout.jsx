import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="mt-10 mx-20">
        <Outlet />
      </main>
    </>
  );
}
