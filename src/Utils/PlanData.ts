export type PricingPlanType = {
  _id?: string;
  name: string;
  price: number | "Custom Pricing";
  currency: string;
  textLimit: string;
  summariesPerDay: number | "Unlimited";
  fileUploads: boolean;
  customization: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
};

const pricingPlans: PricingPlanType[] = [
  {
    name: "Free Plan",
    price: 0,
    currency: "INR",
    textLimit: "500 words per summary",
    summariesPerDay: 5,
    fileUploads: false,
    customization: false,
    prioritySupport: false,
    apiAccess: false,
  },
  {
    name: "Pro Plan",
    price: 299,
    currency: "INR",
    textLimit: "5000 words per summary",
    summariesPerDay: 50,
    fileUploads: true,
    customization: true,
    prioritySupport: true,
    apiAccess: false,
  },
  {
    name: "Enterprise Plan",
    price: "Custom Pricing",
    currency: "INR",
    textLimit: "Unlimited",
    summariesPerDay: "Unlimited",
    fileUploads: true,
    customization: true,
    prioritySupport: true,
    apiAccess: true,
  },
];

const payPerUse: object[] = [
  {
    name: "Basic Summary",
    price: 10,
    currency: "INR",
    wordLimit: 1000,
  },
  {
    name: "Bulk Summary",
    price: 50,
    currency: "INR",
    wordLimit: 10000,
  },
];

const discounts: object[] = [
  {
    type: "Student Discount",
    description: "20% off for students with a valid ID",
  },
  {
    type: "Yearly Plan Discount",
    description: "Get 2 months free if billed annually",
  },
  {
    type: "Referral Bonus",
    description: "₹50 credit for every new user referred",
  },
];

export { pricingPlans, payPerUse, discounts };
