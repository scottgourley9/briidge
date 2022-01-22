import axios from 'axios';
import { useMutation } from 'react-query';

export const useGetInvestors = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/getAllInvestors',
                data
            })
        }, {});

    return {
        onGetInvestors: data => {
            mutate(data);
        },
        ...rest
    }
}
