import {
    disableBodyScroll,
    enableBodyScroll
} from 'body-scroll-lock';

// THIS IS NOT WORKING
export const disableBackgroundScroll = (disable, target) => {
    target = document.getElementsByClassName('button-actions')[0];
    if (target) {
        if (disable) {
            disableBodyScroll(target);
        } else {
            enableBodyScroll(target);
        }
    }
}
