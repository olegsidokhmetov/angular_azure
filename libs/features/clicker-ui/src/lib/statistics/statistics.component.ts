/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, takeWhile, map, EMPTY } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClickerAPI } from '@pipeline-example/data-access/clicker-api';
import { ClickEntry } from '@pipeline-example/util/clicker-entities';
import { MatSort } from '@angular/material/sort';
import { isPlatformBrowser } from '@angular/common';

export interface ClickTableEntry extends ClickEntry {
  index: number;
}
@Component({
  selector: 'clickboard-stats',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClickBordStatisticsComponent
  implements OnDestroy, AfterViewInit, OnInit
{
  private is_active = true;
  data$!: Observable<ClickTableEntry[]>;
  dataSource = new MatTableDataSource<ClickTableEntry>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(ClickerAPI) private _api: ClickerAPI,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.data$ = !isPlatformBrowser(this.platformId)
      ? EMPTY
      : this._api.data$.pipe(
          takeWhile(() => this.is_active),
          map((entries: ClickEntry[]) => {
            let index = 0;
            return entries.map((item) => {
              return {
                index: index++,
                ...item,
              };
            });
          })
        );
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._api.refreshData();
      this.data$.subscribe({
        next: (entries: ClickTableEntry[]) => {
          this.dataSource.data = entries;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.is_active = false;
  }

  refreshData() {
    this._api.refreshData();
  }

  clearData() {
    this._api.clearData();
    this._api.refreshData();
  }
}
