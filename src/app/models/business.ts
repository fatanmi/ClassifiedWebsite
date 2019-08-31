import { ShopLocation } from './shop-location';
import { BusinessCategory } from './business-category';

export class Business {

    id: number;
    merchantId: number;
    name: string;
    description?: any;
    email?: any;
    website?: any;
    branches: ShopLocation[];
    businessTypeId: number;
    businessTypeName: string;
    productCategories: string[];
    businessHours?: any;
}
