import { model } from 'mongoose';
import priceCategorySchema from '../schemas/pricecategory.schema';
import PriceCategory from '../types/IPriceCategory';

const PriceCategoryModel = model<PriceCategory>('PriceCategory', priceCategorySchema);

export default PriceCategoryModel;
