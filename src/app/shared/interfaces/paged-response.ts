export interface PagedResponse<T> {
  current_page: number
  data: T
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string | null
  links: Link[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

interface Link {
  url: string | null
  label: string
  active: boolean
}
