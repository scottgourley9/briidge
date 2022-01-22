import axios from 'axios';
import { useMutation } from 'react-query';

export const useUpdateInvestor = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/updateInvestor',
                data
            })
        }, {});

    return {
        onUpdateInvestor: data => {
            mutate(data);
        },
        ...rest
    }
}
