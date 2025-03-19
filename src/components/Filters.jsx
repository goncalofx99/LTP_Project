import { useStore } from "../hooks/useStore";
import CategorySidebar from "./CategorySideBar";
import SortBy from "./SortBy";

export default function Filters({ closeModal }) {
  const { setInputText } = useStore();

  return (
    <div className="relative">
      <div className="h-150 flex flex-col items-center bg-white border-accent border-b w-full top-16 left-0 overflow-y-auto pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SortBy />
            <input
              placeholder={"Search"}
              className="border-gray-300 border rounded-md w-full p-2"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <CategorySidebar />
          </div>
        </div>
      </div>
      <button
        onClick={closeModal}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 border-accent border bg-white text-accent px-6 py-2 rounded-md"
      >
        Show Results
      </button>
    </div>
  );
}
