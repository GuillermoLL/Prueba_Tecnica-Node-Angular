import { Component } from '@angular/core'
import { UsersService } from './users.service'
import { first, map, Observable, Subject } from 'rxjs'
import { User } from './user.model'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$: Observable<User[]>
  search$ = new Subject<string>()

  constructor (private readonly usersService: UsersService) {
    this.users$ = this.usersService.postUsers(1, 5)
      .pipe(
        first(),
        map((respone) => respone.users)
      )
  }

  search (event: Event): void {
    const input = event.currentTarget as HTMLInputElement
    this.search$.next(input.value)
    this.users$ = this.usersService.getUsers().pipe(
      first(),
      map((respone) => respone.users)
    )

    console.log(input.value)
  }
}
