import { requestNode } from './request'

// 请求搜索结果
export function collection(username) {
  return requestNode({
    url: '/collection',
    data: {
      username
    }
  })
}