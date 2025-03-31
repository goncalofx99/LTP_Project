import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="sm:mt-10 sm:mx-20">
        <Outlet />
      </main>
    </>
  );
}
