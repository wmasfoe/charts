// 全局默认字体
import { textStyleDefault } from '../const/textStyleDefault'

export const getTextStyle = (textStyleConfig: any) => {
    return {
        ...textStyleConfig,
        ...textStyleDefault
    }
}