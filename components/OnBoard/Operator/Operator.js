import { useOnBoardState } from '../StateProvider';

import Step1 from './Step1';
import Step2 from './Step2';

import styles from './Operator.module.scss';

const Operator = () => {
    const [onBoardState] = useOnBoardState();

    const { step } = onBoardState || {};

    return (
        <>
            {step === 2 &&
                <Step1 />
            }
            {step === 3 &&
                <Step2 />
            }
        </>
    );
}

export default Operator;
