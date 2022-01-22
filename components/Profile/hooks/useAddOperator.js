import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddOperator = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/addOperator',
                data
            })
        }, {});

    return {
        onAddOperator: data => {
            mutate(data);
        },
        ...rest
    }
}
