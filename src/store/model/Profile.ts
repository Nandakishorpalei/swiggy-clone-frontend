export enum ProfileTypeEnum {
  PAST_ORDERS = "PAST_ORDERS",
  SWIGGY_ONE_FAQ = "swiggy_one_faq",
  ADDRESSES = "ADDRESSES",
}

export const ProfileTypeEnumMap = {
  [ProfileTypeEnum.PAST_ORDERS]: {
    id: ProfileTypeEnum.PAST_ORDERS,
    title: "Past Orders",
    description: "View your past orders and their details.",
  },
  [ProfileTypeEnum.SWIGGY_ONE_FAQ]: {
    id: ProfileTypeEnum.SWIGGY_ONE_FAQ,
    title: "Swiggy One FAQ",
    description: "Frequently asked questions about Swiggy One.",
  },
  [ProfileTypeEnum.ADDRESSES]: {
    id: ProfileTypeEnum.ADDRESSES,
    title: "Addresses",
    description: "Manage your saved addresses.",
  },
};
