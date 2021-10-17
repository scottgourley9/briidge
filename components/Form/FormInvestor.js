import { Fragment, useEffect } from 'react';

import Logo from '../Logo/Logo';

import styles from './Form.module.scss';

const FormInvestor = () => {
    // useEffect(() => {
    //     const scriptElement = document.createElement('script');
    //     scriptElement.type = 'text/javascript';
    //     scriptElement.src = 'https://webforms.pipedrive.com/f/loader';
    //     document.body.appendChild(scriptElement);
    // }, []);

    const handleOnLoad = e => {
        e.target.style.display = 'inherit';
    }

    return (
        <Fragment>

            <section className={styles['form-page-wrapper']}>
                {/*
                    <div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/1HFNdm99C9qQHzm0pC5cdBz8cnVx1dvR63iUpobC5lmpIARmGSlhRZzda0jl1hv5p" />
                */}
                <iframe onLoad={handleOnLoad} src="https://ghdjnm6x0t1.typeform.com/to/J9VCXLQV" />
            </section>
        </Fragment>
    );
};

export default FormInvestor;
