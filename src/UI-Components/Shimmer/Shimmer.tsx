export const SmallShimmer = () => (
  <div className="h-6 animate-pulse bg-neutral-20 rounded-md py-2 w-2/5" />
);
export const BigShimmer = () => (
  <div className="h-6 animate-pulse bg-neutral-20 rounded-md py-2 w-3/5" />
);

export const ShimmerLoader = () => (
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
