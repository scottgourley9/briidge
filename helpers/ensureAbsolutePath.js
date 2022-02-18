export const ensureAbsolutePath = href => {
    if (!/\/\//gi.test(href)) {
        return `//${href}`;
    }

    return href;
}
