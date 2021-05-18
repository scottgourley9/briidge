import { useEffect } from 'react';

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
        <section className={styles['form-page-wrapper']}>
            {/*
                <div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/1HHdyDhpLu5irok3aOaDqVynFRpXl7u14LSHCcLUbHG2FJS1rEycXHkTURlPOET5x" />
            */}
            <iframe onLoad={handleOnLoad} src="https://webforms.pipedrive.com/f/1HHdyDhpLu5irok3aOaDqVynFRpXl7u14LSHCcLUbHG2FJS1rEycXHkTURlPOET5x?embeded=1&uuid=idygq1g" />
        </section>
    );
};

export default FormInvestor;
