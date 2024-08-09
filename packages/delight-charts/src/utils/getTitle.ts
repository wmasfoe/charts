const defaultTextStyle = {
  top: '0',
  left: '99',
  padding: [0, 0, 20, 0],
  // lineHeight: '26px', // TODO 加了这个 title 消失
  fontFamily: 'PingFang SC',
  // fontWeight: 500,
  // fontSize: '18',
  // color: 'rgba(0, 0, 0, 0.85)'
}

export function getTitle(args: any) {
  args = args ? Object(args) : {}
  let res = {
    textStyle: {
      ...defaultTextStyle
    },
    left: '-3',
    ...args
  }
  if(Array.isArray(args)) {
    res = []
    for (const item of args) {
      res.push({
        textStyle: {
          ...defaultTextStyle
        },
        ...item,
      })
    }
  }
  return res
}
