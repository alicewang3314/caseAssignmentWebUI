
import { Component, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CdkListbox, CdkListboxModule } from '@angular/cdk/listbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgForOf } from '@angular/common';

export interface SelectItem {
  name: string;
  value: string;
}

@Component({
  selector: 'captor-double-direction-select',
  templateUrl: './double-direction-select.component.html',
  styleUrls: ['./double-direction-select.component.scss'],
  standalone: true,
  imports: [CdkListboxModule, MatIconModule, MatButtonModule, NgIf, NgForOf]
})
export class DoubleDirectionSelectComponent {
  @ViewChildren(CdkListbox) listbox!: QueryList<CdkListbox<any>>;
  @Input() leftColumnName: string = '';
  @Input() rightColumnName: string = '';
  @Input() mode: { oneDirection?: boolean; keepOriginal?: boolean } = { oneDirection: false, keepOriginal: false };
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  private _leftColumn: SelectItem[] = [];
  private _rightColumn: SelectItem[] = [];
  newToLeft: any[] = [];
  newToRight: any[] = [];

  @Input()
  set leftColumn(value: SelectItem[]) {
    this._leftColumn = value;
  }
  get leftColumn(): SelectItem[] {
    return this._leftColumn;
  }

  @Input()
  set rightColumn(value: SelectItem[]) {
    this._rightColumn = value;
  }
  get rightColumn(): SelectItem[] {
    return this._rightColumn;
  }

  get isOneDirection(): boolean {
    return this.mode.oneDirection || false;
  }

  /* Remove leftSelected from left column and move it the right column; clear left selected */
  moveToRight() {
    const ref = this._getColumnRef('left');
    const selected = ref?.value;

    if (!selected || selected.length === 0) return;

    selected.forEach(x => {
      const indexinNewToLeft = this.newToLeft.indexOf(x);

      if (indexinNewToLeft !== -1) {
        this.newToLeft.splice(indexinNewToLeft, 1)
      } else {
        this.newToRight.push(x);
      }
    });
    this.rightColumn = [...this.leftColumn.filter(x => selected.find(val => val === x.value)), ...this.rightColumn];
    // Always put new items at top
    this.rightColumn.sort((a, b) => this.newToRight.indexOf(b.value) - this.newToRight.indexOf(a.value));
    if (!this.mode.keepOriginal) {
      this.leftColumn = this.leftColumn.filter(x => !selected.find(val => x.value === val));
    }
    // Resolve issue cannot select from left column after after moving values to right column
    ref?.setAllSelected(false);
    this._onValueChange();
  }

  /* Remove rightSelected from right column and move it the left column, clear right selected */
  moveToLeft() {
    const ref = this._getColumnRef('right');
    const selected = ref?.value;

    if (!selected || selected.length === 0) return;

    selected.forEach(x => {
      const indexInNewToRight = this.newToRight.indexOf(x);

      if (indexInNewToRight !== -1) {
        this.newToRight.splice(indexInNewToRight, 1);
      } else {
        this.newToLeft.push(x);
      }
    });
    this.leftColumn = [...this.rightColumn.filter(x => selected.find(val => val === x.value)), ...this.leftColumn];
    // Always put new items at top
    this.leftColumn.sort((a, b) => this.newToLeft.indexOf(b.value) - this.newToLeft.indexOf(a.value));
    this.rightColumn = this.rightColumn.filter(x => !selected.find(val => val === x.value));
    this._onValueChange();
    // Resolve issue cannot select from right column after moving values to left column
    ref?.setAllSelected(false);
  }

  private _onValueChange() {
    // If one direction, only emit value new to right
    if (this.mode.oneDirection) {
      this.valueChange.emit({ newToRight: this.newToRight });
      return;
    }

    this.valueChange.emit({ newToLeft: this.newToLeft, newToRight: this.newToRight });
  }

  /* Get reference for each listBox */
  private _getColumnRef(position: 'left' | 'right'): CdkListbox | undefined {
    const lis = this.listbox.toArray();

    if (position === 'left') {
      return lis.find(x => x.id === 'leftColumn');
    } else {
      return lis.find(x => x.id === 'rightColumn');
    }
  }
}
