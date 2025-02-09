import mongoose, { Document, model, Schema } from "mongoose";
// Define a specific interface for the purchase plan if you have any structure for it
interface PurchasePlan {
  _id: string;
  name: string;
  price: number | "Custom Pricing";
  currency: string;
  textLimit: string;
  summariesPerDay: number;
  fileUploads: boolean;
  customization: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
}

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  purchasePlan: PurchasePlan | null;
  usage: number;
  isActive: boolean;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Fixed typo here
      unique: true, // Added unique to ensure email uniqueness
    },
    password: {
      type: String,
      required: true,
    },
    purchasePlan: {
      type: Schema.Types.Mixed, // Use Mixed type for more flexible objects if plan structure is variable
      default: null,
    },
    usage: {
      type: Number,
      default: 5,
      min: 0, // You can add validation like min usage if needed
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // Optional: Automatically adds createdAt and updatedAt fields
);

export default model<User>("User", userSchema);
