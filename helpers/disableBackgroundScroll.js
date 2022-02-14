import {
    disableBodyScroll,
    enableBodyScroll
} from 'body-scroll-lock';

// THIS IS NOT WORKING
export const disableBackgroundScroll = (disable, target) => {
    if (target) {
        if (disable) {
            disableBodyScroll(target);
        } else {
            enableBodyScroll(target);
        }
    }
}
