import { Schema, Document, model } from "mongoose";

export interface Plan extends Document {
  _id: string;
  name: string;
  price: number | "Custom Pricing";
  currency: string;
  textLimit: string;
  summariesPerDay: number | "Unlimited";
  fileUploads: boolean;
  customization: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
}

const PlanModel: Schema<Plan> = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Mixed,
    required: true,
  },
  currency: {
    type: String,
  },
  textLimit: {
    type: String,
  },
  summariesPerDay: {
    type: Schema.Types.Mixed,
  },
  fileUploads: {
    type: Boolean,
  },
  apiAccess: {
    type: Boolean,
  },
  customization: {
    type: Boolean,
  },
  prioritySupport: {
    type: Boolean,
  },
});

module.exports = model<Plan>("PlanModel", PlanModel);
