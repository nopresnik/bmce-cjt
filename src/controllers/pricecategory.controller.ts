import { autoInjectable } from 'tsyringe';
import { PriceCategoryService } from '../services/pricecategory.service';
import PriceCategory from '../types/IPriceCategory';
import BaseController from './base.controller';

@autoInjectable()
export class PriceCategoryController extends BaseController<PriceCategory> {
  constructor(priceCategoryService: PriceCategoryService) {
    super(priceCategoryService);
  }
}
