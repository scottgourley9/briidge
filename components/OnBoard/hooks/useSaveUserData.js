import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { useOnBoardState } from '../StateProvider';

export const useSaveUserData = () => {
    const [onBoardState] = useOnBoardState();
    const router = useRouter();

    const { mutate, ...rest } = useMutation(() => {
            return axios({
                method: 'POST',
                url: '/api/addUser',
                data: {
                    user: onBoardState?.user,
                    onBoardState
                }
            })
        }, {
            onSuccess: (data, variables, context) => {
                if (onBoardState.type === 'investor') {
                    router.push('/operators');
                } else if (onBoardState.type === 'operator') {
                    router.push('/investors');
                } else {
                    router.push('/');
                }
            },
            onError: (error, variables, context) => {
                console.log('error: ', error);
            }
        });

    return {
        onSaveUserData: mutate,
        ...rest
    }
}
