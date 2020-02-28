import { Component, OnInit, Input } from '@angular/core';
import {Tile} from '../app.component';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-cheesboard',
  templateUrl: './cheesboard.component.html',
  styleUrls: ['./cheesboard.component.scss']
})
export class CheesboardComponent implements OnInit {
  @Input() arr: Tile[][];
  @Input() hetman;
  @Input() king;
  @Input() horse;
  @Input() tower;
  @Input() runner;
  @Input() pawn;
  constructor() { }

  ngOnInit(): void {
    this.addHightlight(this.arr[2][3]);
  }
    addHightlight(item: Tile) {
      return item.highlight = true;
    }

  getColor(item: Tile): string {
    if (item.highlight) {
      return '#255F69';
    } else if ((item.x + item.y) % 2 === 0) {
      return '#ddbca1';
    } else if ((item.x + item.y) % 2 !== 0) {
      return '#B58863';
    }
  }
  highlightPosibleKingMoves(item: Tile) {
    // left top
    if (this.isInBoard(item.x - 1, item.y - 1)) {
      this.arr[item.x - 1][item.y - 1].highlight = true;
    }
     // left
    if (this.isInBoard(item.x - 1, item.y)) {
      this.arr[item.x - 1][item.y].highlight = true;
    }
    // left bottom
    if (this.isInBoard(item.x - 1, item.y + 1)) {
      this.arr[item.x - 1][item.y + 1].highlight = true;
    }
    // top
    if (this.isInBoard(item.x, item.y - 1)) {
      this.arr[item.x][item.y - 1].highlight = true;
    }
    // bottom
    if (this.isInBoard(item.x, item.y + 1)) {
      this.arr[item.x][item.y + 1].highlight = true;
    }
    // right top
    if (this.isInBoard(item.x + 1, item.y - 1)) {
      this.arr[item.x + 1][item.y - 1].highlight = true;
    }
    // right
    if (this.isInBoard(item.x + 1, item.y)) {
      this.arr[item.x + 1][item.y].highlight = true;
    }
    // right bottom
    if (this.isInBoard(item.x + 1, item.y + 1)) {
      this.arr[item.x + 1][item.y + 1].highlight = true;
    }
  }

  isInBoard( x, y ) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false;
    } else {
      return true;
    }
  }
  getTailClicked(item: Tile) {
    console.log('Kliknięty tile: ' + 'x: ' + item.x + '  y: ' + item.y);
    for (let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.arr[i][j].highlight = false;
      }
    }
    if (item.choosenFile) {
      this.highlightPosibleKingMoves(item);
    }
  }
}
