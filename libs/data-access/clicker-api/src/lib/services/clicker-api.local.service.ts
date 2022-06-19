import { Injectable } from '@angular/core';
import { ClickEntry } from '@pipeline-example/util/clicker-entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClickerAPIService } from './clicker-api.service';

@Injectable({
  providedIn: 'root',
})
export class ClickerAPILocalService extends ClickerAPIService {
  static readonly LOCAL_STORAGE_KEY = 'clicker_api_local_service';

  private _data$ = new BehaviorSubject<ClickEntry[]>([]);
  private data$ = this._data$.asObservable();

  constructor() {
    super();
    this.loadData();
  }

  sendClick(click: ClickEntry): void {
    this._data$.next([...this._data$.value, click]);
    this.saveData();
  }
  fetchData(): Observable<ClickEntry[]> {
    this.loadData();
    return this.data$;
  }
  deleteData(): void {
    this._data$.next([]);
    this.saveData();
  }

  private loadData() {
    try {
      const data = JSON.parse(
        localStorage.getItem(ClickerAPILocalService.LOCAL_STORAGE_KEY) ?? '[]'
      );
      if (data instanceof Array) {
        this._data$.next(
          data.filter(
            (item): item is ClickEntry =>
              'x' in item && 'y' in item && 'date' && item && 'agent' && item
          )
        );
      } else {
        this._data$.next([]);
      }
    } catch (error) {
      this._data$.next([]);
    }
  }

  private saveData() {
    localStorage.setItem(
      ClickerAPILocalService.LOCAL_STORAGE_KEY,
      JSON.stringify(this._data$.getValue())
    );
  }
}
