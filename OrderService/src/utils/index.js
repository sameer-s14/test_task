import mongoose from "mongoose";

export const isValidObjectId = (id) => !!mongoose.isValidObjectId(id);

export const convertToObjectId = (id) => new mongoose.Types.ObjectId(id)