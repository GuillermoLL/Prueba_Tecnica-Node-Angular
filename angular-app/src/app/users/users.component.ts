import { Component } from '@angular/core'
import { UsersService } from './users.service'
import { first, map, Observable } from 'rxjs'
import { User, UserResponse } from './user.model'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$: Observable<User[]>

  page = 1
  pages: number[] = []
  perPage = 5
  total = 0

  constructor (private readonly usersService: UsersService) {
    this.users$ = this.usersService.postUsers(this.page, this.perPage)
      .pipe(
        first(),
        map((response) => this.formatData(response))
      )
  }

  search (event: Event): void {
    const input = event.currentTarget as HTMLInputElement
    this.users$ = this.usersService.getUsers(1, this.perPage, input.value).pipe(
      first(),
      map((response) => this.formatData(response))
    )

    console.log(input.value)
  }

  pagination (pageToGo: number): void {
    this.users$ = this.usersService.postUsers(pageToGo, this.perPage).pipe(
      first(),
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
