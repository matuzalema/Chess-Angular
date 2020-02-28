import { Component } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chees';
  xValue = null;
  yValue = null;
  choosenFigure = '';
  // figures
  tower = '../assets/images/tower.png';
  king = '../assets/images/king1.png';
  hetman = '../assets/images/hetman.png';
  horse = '../assets/images/horse.png';
  pawn = '../assets/images/pawn.png';
  runner = '../assets/images/runner.png';
  // tower = '../assets/images/tower1.png';


  arr: Tile[][] = [];

  createTails() {
    for (let i = 0; i < 8; i++) {
      this.arr[i] = [];
      for (let j = 0; j < 8; j++) {
        const tile = new Tile(i, j, false, '', false, '', '');
        this.arr[i][j] = tile;
      }
    }
    // this.arr[this.xValue][this.yValue].highlight = true;
    console.log(this.arr);
  }

  getXValue(event) {
    this.xValue = event.target.value;
  }
  getYValue(event) {
    this.yValue = event.target.value;
  }
  onSubmit() {
    this.arr[this.xValue][this.yValue].choosenFile = true;
    this.arr[this.xValue][this.yValue].figure = this.choosenFigure;
    this.xValue = null;
    this.yValue = null;
    console.log(this.arr);
  }

  getFigure(figure) {
    this.choosenFigure = figure;
  }
}

export class Tile {
  constructor(
    public x: number,
    public y: number,
    public highlight: boolean,
    public figure: string,
    public choosenFile: boolean,
    public imageSrc: string
  ) {}
}
