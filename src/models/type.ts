import type { Method } from 'axios'

export interface RequestResponse<T> {
  status: 'SUCCESS' | 'FAILED'
  data: any
  afterData: T
}
export interface StoreRestOption {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
  otherConfig: {
    interval: number
    isRepeat: boolean
  }
}

export interface StoreStaticOption {
  id: string
  title?: string
}
