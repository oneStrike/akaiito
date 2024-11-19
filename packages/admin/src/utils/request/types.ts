export interface RequestConfig {
  url: string
  headers?: Record<string, string>
  data?: IterateObject
  params?: IterateObject
  method?: 'POST' | 'GET'
}
