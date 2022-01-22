export const camelCaseObj = obj => {
    if (typeof obj !== 'object') {
        return null;
    }

    return Object.entries(obj).reduce((acc, curr) => {
        const key = curr[0]?.split('_').map((v, i) => {
            if (i) {
                return v?.[0]?.toUpperCase() + v?.slice(1);
            }

            return v;
        }).join('');
        acc[key] = curr[1];

        return acc;
    }, {});
}
