import axios from 'axios';
import { useMutation } from 'react-query';

export const useUploadPhoto = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/uploadPhoto',
                data
            })
        }, {});

    return {
        onUploadPhoto: data => {
            mutate(data);
        },
        ...rest
    }
}
