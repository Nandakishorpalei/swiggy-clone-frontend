import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import { motion } from "framer-motion";

export const SmallShimmer = () => (
  <div className="h-6 animate-pulse bg-neutral-20 rounded-md py-2 w-2/5" />
);
export const BigShimmer = () => (
  <div className="h-6 animate-pulse bg-neutral-20 rounded-md py-2 w-3/5" />
);

export const AddressShimmerLoader = () => (
  <div className="w-full">
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
  </div>
);

export const RestaurantShimmerLoader = () => (
  <div className="w-full">
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
    <div>
      <SmallShimmer /> <BigShimmer />
    </div>
    <div>
      <BigShimmer />
      <SmallShimmer />
    </div>
  </div>
);

export const RestaurantCardShimmer = () => (
  <div className="relative hover:scale-95 transition-all w-full animate-pulse bg-neutral-10">
    <div className="overflow-hidden w-full">
      <div className="relative">
        <div className="w-full h-48 bg-neutral-20"></div>
        <div className="absolute z-10 inset-0 h-full w-full shadow-[rgba(0,_0,_0,_0.9)_0px_-60px_50px_-30px_inset]"></div>
        <div className="absolute bottom-2 z-[20] left-2 bg-neutral-20 text-transparent px-3 py-1 text-sm rounded-md font-bold"></div>
      </div>
      <div className="p-4">
        <div className="h-5 bg-neutral-20 rounded-md mb-2"></div>
        <div className="flex items-center gap-6 text-neutral-20 text-sm mb-2">
          <div className="h-4 bg-neutral-20 rounded-md w-3/4"></div>
          <div className="h-4 bg-neutral-20 rounded-md flex-1"></div>
        </div>
        <div className="flex gap-6">
          <div className="h-6 bg-neutral-20 rounded-md w-1/2 mb-1"></div>
          <div className="h-6 bg-neutral-20 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

export const DishCardShimmer = () => (
  <div className="flex justify-between bg-neutral-20 animate-pulse p-4 rounded-lg">
    <div className="w-4/5">
      <div className="h-4 bg-neutral-30 rounded-md w-1/3 mb-2"></div>
      <div className="h-4 bg-neutral-30 rounded-md w-1/2 mb-2"></div>
      <div className="h-4 bg-neutral-30 rounded-md w-1/4"></div>
    </div>
    <div className="w-32 h-32 bg-neutral-30 rounded-lg"></div>
  </div>
);

export const HelpSectionShimmer = () => (
  <div className="h-[calc(100vh-120px)] w-4/5 mx-auto mt-6 flex flex-col">
    <div className="h-12 bg-surface-lighter-grey rounded-md w-1/3 mb-4 animate-pulse"></div>
    <div className="h-8 bg-surface-lighter-grey rounded-md w-1/3 mb-4 animate-pulse"></div>
    <div className="mt-6 flex gap-8 h-[calc(100%-96px)] bg-surface p-6">
      <div className="flex flex-col min-w-[400px] max-w-[400px] h-full overflow-auto justify-between">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="h-12 bg-neutral-10 rounded-md mb-2 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="h-full bg-neutral-10 overflow-auto flex-1 animate-pulse"></div>
    </div>
  </div>
);

export const MenuSearchShimmer = ({
  blockSearch,
}: {
  blockSearch?: boolean;
}) => (
  <div className="w-full my-8">
    <div className="flex items-center justify-center my-4 text-gray-600 text-lg font-semibold animate-pulse">
      <span className="mr-2">⎯⎯</span>
      <span className="tracking-[5px] text-text-30 font-medium">MENU</span>
      <span className="ml-2">⎯⎯</span>
    </div>
    <div
      className={classNames(
        "relative flex items-center bg-surface-grey p-4 rounded-xl mx-auto animate-pulse",
        {
          "w-full": blockSearch,
          "w-1/2": !blockSearch,
        }
      )}
    >
      <input
        type="text"
        disabled
        placeholder="Search for dishes"
        className="w-full bg-surface-grey outline-none text-text-30 placeholder-text-60"
      />
      <SearchIcon className="text-text-30" />
    </div>
  </div>
);

export const SavedAddressCardShimmer = () => {
  return (
    <div className="p-5 w-full flex gap-2 border border-solid border-neutral-10 bg-white animate-pulse">
      <div className="w-10 h-10 bg-neutral-20 rounded-full"></div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="h-4 bg-neutral-20 rounded-md w-1/3 mb-2"></div>
          <div className="h-3 bg-neutral-20 rounded-md w-2/3"></div>
        </div>
        <div>
          <div className="h-4 bg-neutral-20 rounded-md w-1/4 mt-4 mb-2"></div>
          <div className="h-8 bg-neutral-20 rounded-md w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutShimmer = () => (
  <motion.div className="w-4/5 mx-auto mt-6 flex p-6 gap-6 h-[calc(100vh-120px)]">
    <div className="flex gap-8 h-full w-full">
      <div className="flex flex-col flex-1 h-full gap-6">
        <div className="h-3/4 w-full bg-neutral-20 animate-pulse">
          <div className="grid grid-cols-2 gap-6 p-6">
            <SavedAddressCardShimmer />
            <SavedAddressCardShimmer />
            <SavedAddressCardShimmer />
          </div>
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="h-12 bg-surface animate-pulse"></div>
            <div className="h-12 bg-surface animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 w-full bg-neutral-20 animate-pulse">
          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="h-12 bg-surface animate-pulse"></div>
            <div className="h-12 bg-surface animate-pulse"></div>
            <div className="h-12 bg-surface animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full animate-pulse flex flex-col gap-4 bg-neutral-30 p-6">
        <SavedAddressCardShimmer />
        <SavedAddressCardShimmer />
        <SavedAddressCardShimmer />
      </div>
    </div>
  </motion.div>
);
