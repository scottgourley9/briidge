import axios from 'axios';
import { useMutation } from 'react-query';

export const useDeleteInvestor = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'DELETE',
                url: '/api/deleteInvestor',
                data
            })
        }, {});

    return {
        onDeleteInvestor: data => {
            mutate(data);
        },
        ...rest
    }
}
