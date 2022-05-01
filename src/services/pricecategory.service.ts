import { injectable } from 'tsyringe';
import PriceCategoryModel from '../models/pricecategory.model';
import PriceCategory from '../types/IPriceCategory';
import BaseService from './base.service';

@injectable()
export class PriceCategoryService extends BaseService<PriceCategory> {
  constructor() {
    super(PriceCategoryModel);
  }
}
