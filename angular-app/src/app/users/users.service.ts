import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserResponse } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = 'http://localhost:8080/users'

  constructor (private readonly http: HttpClient) { }

  postUsers (page: number = 1, perPage: number, filter?: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.URL}`, JSON.stringify({
      filter,
      page,
      per_page: perPage
    }))
  }

  getUsers (page: number = 1, perPage: number, filter?: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.URL}?page=${page}&per_page=${perPage}${filter ? '&filter=' + filter : ''}`)
  }
}
