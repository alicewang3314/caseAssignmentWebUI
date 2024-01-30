import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger, MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

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
  // private _navItems: NavItem[] =
  //   [
  //     {
  //       name: 'Individual Reentrant Search',
  //       url: '#',
  //       icon: 'person_search'
  //     }, {
  //       name: 'Case Assignment',
  //       icon: 'assignment',
  //       children: [
  //         {
  //           name: 'Manage Units',
  //           url: '/searchUnit'
  //         },
  //         {
  //           name: 'Manage Staff',
  //           url: '/viewStaffAssignment'
  //         },
  //         {
  //           name: 'View Reentrant Assignment',
  //           url: '/viewUnitManagerAssignment'
  //         },
  //         {
  //           name: 'Bulk Reassignment',
  //           url: '/createBulkAssignment'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Charge Codes',
  //       icon: 'text_snippet',
  //       children: [
  //         {
  //           name: 'Search Code',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Contact Management',
  //       icon: 'contact_phone',
  //       children: [
  //         {
  //           name: 'Contact Directory',
  //           url: '#'
  //         },
  //         {
  //           name: 'Judge Directory',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'GTS',
  //       icon: 'gavel',
  //       children: [
  //         {
  //           name: 'GTS Search',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'IMS',
  //       icon: 'groups',
  //       children: [
  //         {
  //           name: 'IMS Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'IMS Keyword Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Phone Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Institutional Notes',
  //           url: '#'
  //         },
  //         {
  //           name: 'CHS',
  //           url: '#'
  //         },
  //         {
  //           name: 'STG Subset Profile Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'STG Subset Profile Keyword Search',
  //           url: '#'
  //         }
  //       ],
  //     },
  //     {
  //       name: 'Intake',
  //       icon: 'person_add',
  //       children: [
  //         {
  //           name: 'Request AOPC Data',
  //           url: '#'
  //         },
  //         {
  //           name: 'Docket Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Criminal History',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Location Management',
  //       icon: 'pin_drop',
  //       children: [
  //         {
  //           name: 'Organization Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Facility Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Transportation Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Avaliable Bed',
  //           url: '#'
  //         },
  //         {
  //           name: 'Multiple Bed Assignment',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Bed Assign Request',
  //           url: '#'
  //         },
  //         {
  //           name: 'Create Planned Bed Move',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Planned Bed Move',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Online Offline',
  //           url: '#'
  //         },
  //         {
  //           name: 'Online Offline Dashboard',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Unassignedd Reentrant',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Merge Request Status',
  //       url: '#',
  //       icon: 'screen_search_desktop'
  //     },
  //     {
  //       name: 'Parole Case Notes',
  //       icon: 'description',
  //       children: [
  //         {
  //           name: 'Bulk Note',
  //           url: '#'
  //         },
  //         {
  //           name: 'Bulk Contact',
  //           url: '#'
  //         },
  //         {
  //           name: 'Search Case Notes',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Reentrant Details',
  //       icon: 'folder_shared',
  //       children: [
  //         {
  //           name: 'Nickname Search',
  //           url: '#'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Reports',
  //       url: '#',
  //       icon: 'summarize'
  //     },
  //     {
  //       name: 'Request Search',
  //       url: '#',
  //       icon: 'manage_search'
  //     },
  //     {
  //       name: 'Restrict Reentrant Data',
  //       icon: 'disabled_visible',
  //       children: [
  //         {
  //           name: 'View Restrictions',
  //           url: '#'
  //         },
  //         {
  //           name: 'Add Restrictions',
  //           url: '#'
  //         }
  //       ]
  //     }, {
  //       name: 'Tasks',
  //       url: '#',
  //       icon: 'task'
  //     },
  //     {
  //       name: 'VANS',
  //       icon: 'account_box',
  //       children: [
  //         {
  //           name: 'Client Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Registration Search',
  //           url: '#'
  //         },
  //         {
  //           name: 'Intake Worklist',
  //           url: '#'
  //         },
  //         {
  //           name: 'Events Worklist',
  //           url: '#'
  //         },
  //         {
  //           name: 'Input Flags',
  //           url: '#'
  //         },
  //         {
  //           name: 'Follow-ups',
  //           url: '#'
  //         },
  //         {
  //           name: 'Bulk Client Notes',
  //           url: '#'
  //         },
  //         {
  //           name: 'Print Queue',
  //           url: '#'
  //         },
  //         {
  //           name: 'ACP Mail',
  //           url: '#'
  //         }
  //       ]
  //     }
  //   ];
  //Delay the rendering of the expanded menu content
  isReady: boolean = false;
  isSubmenuReady: boolean = false;
  private _activeChildNavItems?: MenuItem[];
  private _activeTrigger?: MatMenuTrigger;
  // private _mouseOverMenu?: boolean;

  get navItems() {
    console.log(this._user.memu);
    return this._user.memu;
  }

  private _processNavItem() { }

  get activeChildNavItems() {
    return this._activeChildNavItems;
  }

  toggleNavigation() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      setTimeout(() => this.isReady = true, 300);
    } else {
      this.isReady = false;
    }
  }

  openSubmenu(idx: number, children?: MenuItem[]) {
    console.log('open submenu');
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

  constructor(private _user: UserService) { }
}


