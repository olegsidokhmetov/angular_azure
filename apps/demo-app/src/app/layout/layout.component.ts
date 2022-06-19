/* eslint-disable @angular-eslint/component-selector */
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  _current_scheme$: BehaviorSubject<string>;
  current_scheme$: Observable<string>;
  current_scheme: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.current_scheme = 'dark';
    this._current_scheme$ = new BehaviorSubject<string>(this.current_scheme);
    this.current_scheme$ = this._current_scheme$.asObservable();
  }
  ngOnInit(): void {
    this._current_scheme$.next(
      !isPlatformBrowser(this.platformId)
        ? this.current_scheme
        : window
            .getComputedStyle(document.body)
            .getPropertyValue('--color-scheme')
            .trim() ?? this.current_scheme
    );
  }

  toggleColorScheme(scheme: string) {
    this._current_scheme$.next(scheme);
  }
}
