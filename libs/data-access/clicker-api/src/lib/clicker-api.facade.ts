import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { ClickerAPIService } from './services';

import { ClickEntry } from '@pipeline-example/util/clicker-entities';
@Injectable()
export class ClickerAPI {
  agent: string;

  private _data$ = new BehaviorSubject<ClickEntry[]>([]);
  data$: Observable<ClickEntry[]> = this._data$.asObservable();

  private dataSource$!: Observable<ClickEntry[]>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(ClickerAPIService) private _service: ClickerAPIService
  ) {
    this.agent = !isPlatformBrowser(this.platformId)
      ? 'server-agent'
      : window.navigator.userAgent;

    this.dataSource$ = !isPlatformBrowser(this.platformId)
      ? EMPTY
      : this._service.fetchData();

    this.dataSource$.subscribe({
      next: (entries) => this._data$.next(entries),
    });
  }

  refreshData() {
    this._service.fetchData();
  }

  clearData() {
    this._service.deleteData();
  }

  sendClick(click: MouseEvent) {
    const entry: ClickEntry = {
      x: click.offsetX,
      y: click.offsetY,
      date: new Date(),
      agent: this.agent,
    };
    this._service.sendClick(entry);
  }
}
