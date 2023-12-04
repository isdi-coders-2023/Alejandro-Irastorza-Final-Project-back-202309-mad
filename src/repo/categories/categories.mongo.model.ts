import { Schema, model } from 'mongoose';
import { Category } from '../../entities/category';

const categoriesSchema = new Schema<Category>({
  category: {
    type: String,
  },
});
categoriesSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CategoryModel = model<Category>(
  'Category',
  categoriesSchema,
  'categories'
);
