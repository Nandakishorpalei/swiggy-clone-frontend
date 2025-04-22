export type Choice = {
  id: string;
  name: string;
  price?: number;
  inStock?: number;
  isVeg?: number | null;
  isEnabled: number;
};

export type Addon = {
  groupId: string;
  groupName: string;
  choices: Choice[];
  maxAddons: number;
  maxFreeAddons: number;
};

export type ItemAttribute = {
  vegClassifier: string;
};

export type Rating = {
  rating?: string;
  ratingCount?: string;
  ratingCountV2?: string;
};

export type AggregatedRating = {
  aggregatedRating: Rating;
};

export type OfferTag = {
  matchText: string;
};

export type Info = {
  id: string;
  name: string;
  category: string;
  cuisines: string[];
  description?: string;
  imageId?: string;
  inStock?: number;
  isVeg?: number;
  price?: number;
  finalPrice?: number;
  variants?: Record<string, any>;
  variantsV2?: Record<string, any>;
  addons?: Addon[];
  itemAttribute?: ItemAttribute;
  ribbon?: Record<string, any>;
  type?: string;
  offerTags?: OfferTag[];
  itemBadge?: Record<string, any>;
  badgesV2?: Record<string, any>;
  itemNudgeType?: string;
  ratings: AggregatedRating;
  itemPriceStrikeOff?: boolean;
  offerIds?: string[];
};

export type Dish = {
  "@type": string;
  info: Info;
  analytics?: Record<string, any>;
  hideRestaurantDetails?: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id: string;
};
