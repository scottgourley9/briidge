import axios from 'axios';
import { useMutation } from 'react-query';

export const useGetUserData = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/getUserData',
                data
            })
        }, {});

    return {
        onGetUserData: data => {
            mutate(data);
        },
        ...rest
    }
}
