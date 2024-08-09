export const getLabelName = (labelMap = {}, name = '') => {
    return labelMap[name] || name
}