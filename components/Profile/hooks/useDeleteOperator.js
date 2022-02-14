import axios from 'axios';
import { useMutation } from 'react-query';

export const useDeleteOperator = () => {
    const { mutate, ...rest } = useMutation(data => {
        console.log('yolo');
            return axios({
                method: 'DELETE',
                url: '/api/deleteOperator',
                data
            })
        }, {});

    return {
        onDeleteOperator: data => {
            mutate(data);
        },
        ...rest
    }
}
