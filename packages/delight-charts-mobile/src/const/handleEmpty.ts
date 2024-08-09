import { h } from 'vue'
export const defaultEmpty = (config: any = {}) => {
  
  const { emptyImgUrl = '', emptyTitle = '' } = config
  return h('div', { class: 'empty-box' }, [
    emptyImgUrl ? 
    h('img', {
      class: 'empty-img',
      src: emptyImgUrl,
      alt: '',
    }) : null,
    h('div', { class: 'empty-title' }, emptyTitle || '暂无数据'),
  ])
}
