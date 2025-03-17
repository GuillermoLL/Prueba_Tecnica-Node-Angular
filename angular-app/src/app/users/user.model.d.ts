export interface User {
  'id': number
  'email': string
  'name': string
  'surname1': string
  'surname2': string
}

export interface _metadata {
  'pages': number
  'page': number
  'per_page': number
  'filter': string
}

export interface UserResponse {
  _metadata
  users: User[]
}
