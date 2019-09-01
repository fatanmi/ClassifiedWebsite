import { Shop } from './shop';
import { BusinessCategory } from './business-category';

export class Business {

    id: number;
    merchantId: number;
    name: string;
    description?: any;
    email?: any;
    website?: any;
    branches: Shop[];
    businessTypeId: number;
    businessTypeName: string;
    productCategories: string[];
    businessHours?: any;
}
