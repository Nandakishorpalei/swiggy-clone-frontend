export enum HelpTypeEnum {
  PAST_ORDERS = "past_orders",
  SWIGGY_ONE_FAQ = "swiggy_one_faq",
  GENERAL = "general",
  SAFETY_ISSUE = "safety_issue",
  LEGAL = "legal",
  FAQ = "faq",
  SWIGGY_MONEY_FAQ = "swiggy_money_faq",
  CBCC_FEATURES = "cbcc_features",
  CBCC_USAGE = "cbcc_usage",
}

export type HelpType = {
  _id: string;
  type: HelpTypeEnum;
  title: string;
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
