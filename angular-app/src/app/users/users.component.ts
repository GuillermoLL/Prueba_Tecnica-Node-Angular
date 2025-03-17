import { Component } from '@angular/core'
import { UsersService } from './users.service'
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs'
import { User, UserResponse } from './user.model'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$ = new Observable<User[]>()
  searchFilter$ = new BehaviorSubject<string>('')

  page = 1
  pages: number[] = []
  perPage = 5
  total = 0

  constructor (private readonly usersService: UsersService) {
    this.pagination(1)
  }

  search (event: Event): void {
    const input = event.currentTarget as HTMLInputElement
    this.pagination(1)
    this.searchFilter$.next(input.value)
  }

  pagination (pageToGo: number): void {
    this.users$ = this.searchFilter$.pipe(
      switchMap((filter) => this.usersService.postUsers(pageToGo, this.perPage, filter)),
      map((response) => this.formatData(response))
    )
  }

  formatData (response: UserResponse): User[] {
    this.page = response._metadata.page
    this.pages = []
    for (let index = 1; index <= response._metadata.pages; index++) {
      this.pages.push(index)
    }
    this.total = response._metadata.total
    return response.users
  }
}
