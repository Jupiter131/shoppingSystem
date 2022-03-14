import { requestNode } from './request'

// 请求搜索结果
export function search(key) {
  return requestNode({
    url: '/search',
    data: {
      key
    }
  })
}