import { Component, Input } from '@angular/core';

export type NavItem = {
  name: string;
  url?: string;
  icon?: string;
  children?: NavItem[];
}

@Component({
  selector: 'nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isExpanded: boolean = false;
  navItems: NavItem[] = [
    {
      name: 'Individual Reentrant Search',
      url: '#',
      icon: 'account_box'
    },
    {
      name: 'Case Assignment',
      icon: 'account_box',
      children: [
        {
          name: 'Manage Units',
          url: '/searchUnit'
        },
        {
          name: 'Manage Staff',
          url: '/viewStaffAssignment'
        },
        {
          name: 'View Reentrant Assignment',
          url: '/viewUnitManagerAssignment'
        },
        {
          name: 'Bulk Reassignment',
          url: '/createBulkAssignment'
        }
      ]
    },
    {
      name: 'Charge Codes',
      icon: 'account_box',
      children: [
        {
          name: 'Contact Management',
          url: '#'
        }
      ]
    },
    {
      name: 'GTS',
      icon: 'account_box',
      children: [
        {
          name: 'GTS Search',
          url: '#'
        }
      ]
    },
    {
      name: 'IMS',
      icon: 'account_box',
      children: [
        {
          name: 'IMS Search',
          url: '#'
        },
        {
          name: 'IMS Keyword Search',
          url: '#'
        },
        {
          name: 'Phone Search',
          url: '#'
        },
        {
          name: 'Institutional Notes',
          url: '#'
        },
        {
          name: 'CHS',
          url: '#'
        },
        {
          name: 'STG Subset Profile Search',
          url: '#'
        },
        {
          name: 'STG Subset Profile Keyword Search',
          url: '#'
        }
      ],
    },
    {
      name: 'Intake',
      icon: 'account_box',
      children: [
        {
          name: 'Request AOPC Data',
          url: '#'
        },
        {
          name: 'Docket Search',
          url: '#'
        },
        {
          name: 'Criminal History',
          url: '#'
        }
      ]
    },
    {
      name: 'Location Management',
      icon: 'account_box',
      children: [
        {
          name: 'Organization Search',
          url: '#'
        },
        {
          name: 'Facility Search',
          url: '#'
        },
        {
          name: 'Transportation Search',
          url: '#'
        },
        {
          name: 'Search Avaliable Bed',
          url: '#'
        },
        {
          name: 'Multiple Bed Assignment',
          url: '#'
        },
        {
          name: 'Search Bed Assign Request',
          url: '#'
        },
        {
          name: 'Create Planned Bed Move',
          url: '#'
        },
        {
          name: 'Search Planned Bed Move',
          url: '#'
        }
        ,
        {
          name: 'Search Online Offline',
          url: '#'
        },
        {
          name: 'Online Offline Dashboard',
          url: '#'
        },
        {
          name: 'Search Unassignedd Reentrant',
          url: '#'
        }
      ]
    },
    {
      name: 'Merge Request Status',
      url: '#',
      icon: 'account_box'
    },
    {
      name: 'Parole Case Notes',
      icon: 'account_box',
      children: [
        {
          name: 'Bulk Note',
          url: '#'
        },
        {
          name: 'Bulk Contact',
          url: '#'
        },
        {
          name: 'Search Case Notes',
          url: '#'
        }
      ]
    },
    {
      name: 'Reentrant Details',
      icon: 'account_box',
      children: [
        {
          name: 'Nickname Search',
          url: '#'
        }
      ]
    }, {
      name: 'Reports',
      url: '#',
      icon: 'account_box'
    },
    {
      name: 'Request Search',
      url: '#',
      icon: 'account_box'
    },
    {
      name: 'Restrict Reentrant Data',
      icon: 'account_box',
      children: [
        {
          name: 'View Restrictions',
          url: '#'
        },
        {
          name: 'Add Restrictions',
          url: '#'
        }
      ]
    }, {
      name: 'Tasks',
      url: '#',
      icon: 'account_box'
    },
    {
      name: 'VANS',
      icon: 'account_box',
      children: [
        {
          name: 'Client Search',
          url: '#'
        },
        {
          name: 'Registration Search',
          url: '#'
        },
        {
          name: 'Intake Worklist',
          url: '#'
        },
        {
          name: 'Events Worklist',
          url: '#'
        },
        {
          name: 'Input Flags',
          url: '#'
        },
        {
          name: 'Follow-ups',
          url: '#'
        },
        {
          name: 'Bulk Client Notes',
          url: '#'
        },
        {
          name: 'Print Queue',
          url: '#'
        },
        {
          name: 'ACP Mail',
          url: '#'
        }
      ]
    }
  ];
}
