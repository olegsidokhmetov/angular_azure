import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ClickEntry } from '@pipeline-example/util/clicker-entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClickerAPIService } from './clicker-api.service';
import { ClickerAPIConfig, CLICKER_API_CONFIG } from '../clicker-api.config';

@Injectable({
  providedIn: 'root',
})
export class ClickerAPIRemoteService extends ClickerAPIService {
  private _data$ = new BehaviorSubject<ClickEntry[]>([]);
  private data$ = this._data$.asObservable();

  private endpoints!: {
    click: string;
    clear: string;
    refresh: string;
  };

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject('CLICKER_API_CONFIG') private config: ClickerAPIConfig
  ) {
    super();
    if (this.config.rootUrl instanceof URL) {
      this.endpoints = {
        click: new URL('click', this.config.rootUrl).toString(),
        clear: new URL('clear', this.config.rootUrl).toString(),
        refresh: new URL('data', this.config.rootUrl).toString(),
      };
    } else {
      this.endpoints = {
        click: this.config.rootUrl + 'click',
        clear: this.config.rootUrl + 'clear',
        refresh: this.config.rootUrl + 'data',
      };
    }
  }

  sendClick(click: ClickEntry): void {
    this.http.post(this.endpoints.click, click ).subscribe({
      next: () => this.refreshData(),
    });
  }
  fetchData(): Observable<ClickEntry[]> {
    this.refreshData();
    return this.data$;
  }
  deleteData(): void {
    this.http.post(this.endpoints.clear, {}).subscribe({
      next: () => this.refreshData(),
    });
  }

  private refreshData(): void {
    this.http.get<ClickEntry[]>(this.endpoints.refresh).subscribe({
      next: (entries: ClickEntry[]) => this._data$.next(entries),
    });
  }
}
