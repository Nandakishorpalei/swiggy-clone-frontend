type Action = {
  link: string;
  text: string;
  type: string;
};

type Accessibility = {
  altText: string;
  altTextCta: string;
};

export type Offer = {
  id: string;
  imageId: string;
  action: Action;
  entityType: string;
  accessibility: Accessibility;
  entityId: string;
  frequencyCapping: Record<string, unknown>;
  externalMarketing: Record<string, unknown>;
};

type SLA = {
  deliveryTime: number;
  lastMileTravel: number;
  serviceability: string;
  slaString: string;
  lastMileTravelString: string;
  iconType: string;
};

type Availability = {
  nextCloseTime: string;
  opened: boolean;
};

type BadgesV2 = {
  entityBadges: {
    imageBased: Record<string, unknown>;
    textBased: Record<string, unknown>;
    textExtendedBadges: Record<string, unknown>;
  };
};

type AggregatedDiscountInfoV3 = {
  header: string;
  subHeader: string;
};

type LoyaltyDiscoverPresentationInfo = {
  logoCtx: {
    text: string;
    logo: string;
  };
  freedelMessage: string;
};

type DifferentiatedUI = {
  displayType: string;
  differentiatedUiMediaDetails: {
    lottie: Record<string, unknown>;
    video: Record<string, unknown>;
  };
};

type ExternalRatings = {
  aggregatedRating: {
    rating: string;
  };
};

export type RestaurantInfo = {
  id: string;
  name: string;
  cloudinaryImageId: string;
  locality: string;
  areaName: string;
  costForTwo: string;
  cuisines: string[];
  avgRating: number;
  parentId: string;
  avgRatingString: string;
  totalRatingsString: string;
  sla: SLA;
  availability: Availability;
  badges: Record<string, unknown>;
  isOpen: boolean;
  type: string;
  badgesV2: BadgesV2;
  aggregatedDiscountInfoV3?: AggregatedDiscountInfoV3;
  loyaltyDiscoverPresentationInfo?: LoyaltyDiscoverPresentationInfo;
  differentiatedUi: DifferentiatedUI;
  reviewsSummary: Record<string, unknown>;
  displayType: string;
  restaurantOfferPresentationInfo: Record<string, unknown>;
  externalRatings: ExternalRatings;
  ratingsDisplayPreference: string;
};

type Analytics = {
  context: string;
};

type CTA = {
  link: string;
  type: string;
};

export type TopRestaurantResponse = {
  info: RestaurantInfo;
  analytics?: Analytics;
  cta: CTA;
  _id: string;
  restaurantId: string;
};
