import { Schema, model } from 'mongoose';
import { Product } from '../../entities/product.js';

const productsSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  new: {
    type: Boolean,
  },
  noStock: {
    type: Boolean,
  },
  topOrder: {
    type: Boolean,
  },
  category: {
    type: String,
  },
  modelImg: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
  refImg: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
});

productsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const ProductModel = model<Product>(
  'Product',
  productsSchema,
  'products'
);
