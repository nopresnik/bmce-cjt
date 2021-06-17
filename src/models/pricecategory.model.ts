import { model } from 'mongoose';
import PriceCategory from 'types/IPriceCategory';
import priceCategorySchema from '../schemas/pricecategory.schema';

const PriceCategoryModel = model<PriceCategory>('PriceCategory', priceCategorySchema);

export default PriceCategoryModel;
