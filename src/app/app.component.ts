import { Component } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chees';

  arr: Tile[][] = [];

  createTails() {
    for (let i = 0; i < 8; i++) {
      this.arr[i] = [];
      for (let j = 0; j < 8; j++) {
        const tile = new Tile(i, j, false, '', false);
        this.arr[i][j] = tile;
      }
    }
    this.arr[5][5].hightlight = true;
    console.log(this.arr);
  }
}

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public hightlight: boolean,
    public figure: string,
    public choosen: boolean
  ) {}
}
