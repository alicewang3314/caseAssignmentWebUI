import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger, MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { environment as env } from 'src/environments/environment';

export type MenuItem = {
  name: string;
  url?: string;
  icon?: string;
  children?: MenuItem[];
  // after are all captors
  isOpen?: boolean;
  isVisible?: string;
  baseUrl?: string;
  state?: string;
  permissions?: string[];
  description?: string;
  isExternalSite?: boolean;
  isOffenderRequired?: boolean;
  callingFunction?: any;
  id?: number;
  parentId?: number;
  linkType?: string;
}

// Temperaly used by the parent menuItems to get icon
const ICONS = ['person_search', 'assignment', 'text_snippet', 'contact_phone', 'gavel', 'groups', 'person_add', 'folder_shared', 'pin_drop'];

@Component({
  selector: 'captor-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        style({ opacity: 0, transform: 'translateY(-10PX)' }),
        animate('350ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 0.8 }))
      ])
    ])
  ],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'submenu-cdk-overlay-container' }
    }
  ],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class NavigationComponent {
  @ViewChild('submenu') submenu?: MatMenu;
  @ViewChildren(MatMenuTrigger) menuTriggers?: QueryList<MatMenuTrigger>;
  isExpanded: boolean = false;
  // TODO: temperaly used to generate icons
  icons: string[] = ICONS;
  //Delay the rendering of the expanded menu content
  isReady: boolean = false;
  isSubmenuReady: boolean = false;
  private _activeChildNavItems?: MenuItem[];
  private _activeTrigger?: MatMenuTrigger;
  // private _mouseOverMenu?: boolean;

  get navItems() {
    return this._user.memu;
  }

  get activeChildNavItems() {
    return this._activeChildNavItems;
  }

  toggleNavigation() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {//
      setTimeout(() => this.isReady = true, 300);
    } else {
      this.isReady = false;
    }
  }

  openSubmenu(idx: number, children?: MenuItem[]) {
    const newTrigger = this.menuTriggers?.toArray()[idx];
    // If over same trigger, do nothing
    if (newTrigger === this._activeTrigger) {
      return;
    }
    // If over different trigger, close previously opened menu
    if (this._activeTrigger && this._activeTrigger.menuOpened) {
      this._activeTrigger.closeMenu();
    }
    this._activeChildNavItems = children;
    this._activeTrigger = newTrigger;
    // If has submenu, open it
    if (children) {
      this._activeChildNavItems = children;
      this._activeTrigger?.openMenu();
    }
  }

  /** 
   * Navigate to other captor application or navigate within current app
   */
  navigate(url: string = '', appBaseUrl: string = '') {
    const currentUrl = window.location.href;

    if (currentUrl.indexOf(appBaseUrl) == -1) {
      const path = `${env.baseUrl}${appBaseUrl}/#!/${url}`;
      window.location.href = path;
    } else {
      this._router.navigate([url]);
    }
  }

  constructor(private _user: UserService, private _router: Router) { }
}


