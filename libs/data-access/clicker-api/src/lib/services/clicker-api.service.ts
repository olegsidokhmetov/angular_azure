import { Injectable } from '@angular/core';
import { ClickEntry } from '@pipeline-example/util/clicker-entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ClickerAPIService {
  abstract sendClick(click: ClickEntry): void;

  abstract fetchData(): Observable<ClickEntry[]>;

  abstract deleteData(): void;
}
