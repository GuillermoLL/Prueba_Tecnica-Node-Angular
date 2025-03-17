import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserResponse } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = 'http://localhost:8080/users'

  constructor (private readonly http: HttpClient) { }

  postUsers (page?: number, perPage?: number, filter?: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.URL}`, {
      filter,
      page,
      per_page: perPage
    })
  }

  getUsers (page?: number, perPage?: number, filter?: string): Observable<UserResponse> {
    const params = new HttpParams()
    if (page && perPage && filter) {
      params
        .set('filter', filter)
        .set('page', page)
        .set('per_page', perPage)
    }
    return this.http.get<UserResponse>(`${this.URL}`, { params })
  }
}
