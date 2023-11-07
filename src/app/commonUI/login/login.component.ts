import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoadingService } from '../loading/loading.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common'

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms', style({ opacity: 0, transform: 'translateY(-60px)' }))
  ]),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-60px)' }),
    animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf]
})
export class LoginComponent {
  private _isDisclaimerAgreed?: boolean;
  header = 'Disclaimer';
  disclaimer = `Information displayed following access to the Pennsylvania Department of Corrections and
   Pennsylvania Board of Probation and Parole reentrant information system, otherwise known as CAPTOR,
    may be subject to various State and Federal laws and regulations restricting access to and the
    dissemination of this information. The State and Federal laws include, but are not limited to,
    Pennsylvania’s Drug and Alcohol Abuse Control Act, Criminal History Record Information Act (CHRIA),
    and Mental Health Procedures Act. I understand that I may only use CAPTOR and the information
    contained therein for Commonwealth of Pennsylvania business activities. I will not release information
     obtained from CAPTOR without authorization via Department of Corrections or the Pennsylvania Board of
     Probation and Parole Policy. I will not engage in any illegal activity in connection with my use of
     the Commonwealth's CAPTOR access, including, but not limited to, unauthorized dissemination or
     transmission of information displayed by CAPTOR. I understand that any violation of this agreement
      may result in disciplinary action, civil or criminal penalties, and/or discontinuation of or
      restrictions on future access to CAPTOR.`;
  disclainerWarningMsg = `You are not authorized to access the CAPTOR System without accepting the
     above terms and conditions.`;
  // For discalimer card fade out animation
  showCard = true;

  get showWarningMsg(): boolean {
    return this._isDisclaimerAgreed !== undefined && !this._isDisclaimerAgreed;
  }

  setDisclaimerStatus(val: boolean) {
    this._isDisclaimerAgreed = val;

    // If agreed, validate user credentials and redirect to home page
    if (this._isDisclaimerAgreed) {
      // TODO: router and user validation logic should put into service
      this.showCard = false;

      // TODO: REMOVE
      this._loading.open();

      setTimeout(() => {
        this._router.navigateByUrl('/app');
        this._loading.close()
      }, 1000);
    }
  }

  // TODO: remove loading placeholder
  constructor(private _router: Router, private _loading: LoadingService) {
  }
}
