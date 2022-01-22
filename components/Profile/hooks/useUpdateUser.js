import axios from 'axios';
import { useMutation } from 'react-query';

export const useUpdateUser = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/updateUser',
                data
            })
        }, {});

    return {
        onUpdateUser: data => {
            mutate(data);
        },
        ...rest
    }
}
