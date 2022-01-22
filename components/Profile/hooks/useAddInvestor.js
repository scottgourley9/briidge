import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddInvestor = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/addInvestor',
                data
            })
        }, {});

    return {
        onAddInvestor: data => {
            mutate(data);
        },
        ...rest
    }
}
