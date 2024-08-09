export const getStackMap = (stack: Record<string, any[]>) => {
    const stackMap: Record<string, any> = {}
    Object.keys(stack).forEach(item => {
        stack[item].forEach(name => {
            stackMap[name] = item
        })
    })
    return stackMap
}

export const $get = (url: string) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send(null)
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText))
        }
        xhr.onerror = () => {
            reject(JSON.parse(xhr.responseText))
        }
    })
}


export function setArrayValue(arr: any, index: any, value: any) {
    if (arr[index] !== undefined) {
        arr[index].push(value)
    } else {
        arr[index] = [value]
    }
}
export const isArray = (arr: any): boolean => {
    return Array.isArray(arr);
}
// 是否是小数
export const checkDot = (num: string) => {
    return /[\.]/.test(num);
}