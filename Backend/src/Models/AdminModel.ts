import { Document, model, Schema } from "mongoose";

export interface adminInterface extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("AdminModel", adminSchema);
