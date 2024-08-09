export const getBubbleSymbolSize = (value: number[], params: Record<string, any>, symbolZoomMax) => {
    // 以100为基准，按最大值缩放比例
    const num = (value[2] / symbolZoomMax) * 100
    // 保证下限最小值为5
    if (num <= 5) {
        return 5
    }
    return num
};