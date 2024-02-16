export interface ResponseAPI<T> {
  message: string
  data: T
  error: boolean
  status_code: number
  errors: []
}
