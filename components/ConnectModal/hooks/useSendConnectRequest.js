import axios from 'axios';
import { useMutation } from 'react-query';

export const useSendConnectRequest = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/sendConnectRequest',
                data
            })
        }, {});

    return {
        onSendConnectRequest: data => {
            mutate(data);
        },
        ...rest
    }
}
