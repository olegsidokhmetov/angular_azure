/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ClickerAPI } from '@pipeline-example/data-access/clicker-api';

@Component({
  selector: 'clickboard',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClickBordComponent {

  constructor(
    @Inject(ClickerAPI) private _clickerAPI : ClickerAPI
  ){}


  handleClick($event: MouseEvent){
    this._clickerAPI.sendClick($event);
  }
}
