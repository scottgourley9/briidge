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
                <div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/1HFNdm99C9qQHzm0pC5cdBz8cnVx1dvR63iUpobC5lmpIARmGSlhRZzda0jl1hv5p" />
            */}
            <iframe onLoad={handleOnLoad} src="https://webforms.pipedrive.com/f/1HFNdm99C9qQHzm0pC5cdBz8cnVx1dvR63iUpobC5lmpIARmGSlhRZzda0jl1hv5p?embeded=1&uuid=idzxeyp9" />
        </section>
    );
};

export default FormInvestor;
