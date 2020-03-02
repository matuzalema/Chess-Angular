import { Component } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chees';
  getName = 'George';
}
export class Tile {
  constructor(
    public x: number,
    public y: number,
    public highlight: boolean,
    public figure: string,
    public imageSrc: string
  ) {}
}
