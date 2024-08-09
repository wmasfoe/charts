export const formatAreaData = (r: string) => {
    if(!r) {
        return r
    }
    const str = r
        .replace(/维吾尔自治区/g, '')
        .replace(/回族自治区/g, '')
        .replace(/壮族自治区/g, '')
        .replace(/特别行政区/g, '')
        .replace(/自治区/g, '')
        .replace(/省/g, '')
        .replace(/市/g, '');
    return str;
};