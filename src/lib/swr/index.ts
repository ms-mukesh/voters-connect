import axios from '@/src/lib/axios';

const fetcher = async <T>(url: string) => {
    return axios.get<T>(url).then((res) => res.data);
};

export default fetcher;
