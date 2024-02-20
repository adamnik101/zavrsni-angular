import {ResponseError} from "./response-error";

export interface ResponseAPI<T> {
  message: string
  data: T
  error: boolean
  status_code: number
  errors: ResponseError
}
