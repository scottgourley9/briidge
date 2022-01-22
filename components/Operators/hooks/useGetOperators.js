import axios from 'axios';
import { useMutation } from 'react-query';

export const useGetOperators = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/getAllOperators',
                data
            })
        }, {});

    return {
        onGetOperators: data => {
            mutate(data);
        },
        ...rest
    }
}
