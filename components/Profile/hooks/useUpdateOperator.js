import axios from 'axios';
import { useMutation } from 'react-query';

export const useUpdateOperator = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/updateOperator',
                data
            })
        }, {});

    return {
        onUpdateOperator: data => {
            mutate(data);
        },
        ...rest
    }
}
