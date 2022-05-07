import useSWR, { SWRConfiguration } from 'swr';

import fetcher from '@/src/lib/swr';
import callApi from '@/src/utils/api';

import { DUMMY_DATA_LIST } from '@/src/constant/endpoint/demo';
import { IApiDummy } from '@/src/types/api/demo';

export function useDummyList(options?: SWRConfiguration) {
    const { data, error } = useSWR<IApiDummy[]>(
        DUMMY_DATA_LIST,
        (url) => fetcher<IApiDummy[]>(url),
        options
    );
    return {
        data: data,
        loading: !error && !data,
        error: error,
    };
}

export function insertDummyRecord({}) {
    return callApi<any>(DUMMY_DATA_LIST);
}
