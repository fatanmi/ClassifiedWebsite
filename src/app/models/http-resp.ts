import { Market } from './market';

export interface HttpResp {
    status: boolean;
    code: string;
    message: string;
    description: string;
    timestamp: string;
    data: Market[];
}
