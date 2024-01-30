import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule]
})
export class UnauthorizedComponent {
  login() {
    debugger
    this._user.initUser().subscribe({
      next: () => this._router.navigate(['/']),
      error: (err) => console.log(`Err when login: ${JSON.stringify(err)}`)
    });
  }

  constructor(private _user: UserService, private _router: Router) { }
}
