import axios from 'axios';
import { useMutation } from 'react-query';

export const useSendMessage = () => {
    const { mutate, ...rest } = useMutation(data => {
            return axios({
                method: 'POST',
                url: '/api/sendMessage',
                data
            })
        }, {});

    return {
        onSendMessage: data => {
            mutate(data);
        },
        ...rest
    }
}
