import type { UseFetchOptions } from 'nuxt/app';
import type { Controls } from '~/api/handler';
import _fetch from '~/api/handler';
import type { NitroFetchOptions } from 'nitropack';
import type { GeoAddress } from '~/types/completion';

export interface GetAddressCompletionPayload {
    query: string
    country?: string
    region_with_type?: string
    city?: string
    street?: string
    house?: string
    to_bound?: string
}

export interface GetAddressCompletionData {
    suggestions: {
        value: string
        unrestricted_value: string
        data: GeoAddress
    }[]  
}


export default {
    GET_ADDRESS_COMPLETION: (
        data: GetAddressCompletionPayload, 
        options?: NitroFetchOptions<any>, 
        controls?: Controls
    ) => _fetch<GetAddressCompletionData>('GET', `/complete-address`, data, options, { ...controls, noAuth: true }),
};
