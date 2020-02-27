import { Component, OnInit, Input } from '@angular/core';
import {Tile} from '../app.component';

@Component({
  selector: 'app-cheesboard',
  templateUrl: './cheesboard.component.html',
  styleUrls: ['./cheesboard.component.scss']
})
export class CheesboardComponent implements OnInit {
  @Input() arr: Tile[][];
  constructor() { }

  ngOnInit(): void {
    this.addHightlight(this.arr[2][3]);
  }
    addHightlight(item: Tile) {
      return item.hightlight = true;
    }

  getColor(item: Tile): string {
    if (item.hightlight) {
      return '#255F69';
    } else if ((item.x + item.y) % 2 === 0) {
      return '#ddbca1';
    } else if ((item.x + item.y) % 2 !== 0) {
      return '#B58863';
    }
  }
  showDataOfClicledTile(item: Tile) {
    console.log('Kliknięty tile: ' + 'x: ' + item.x + '  y: ' + item.y);
    item.hightlight = true;

    // this.arr[item.x ][item.y + 1].hightlight = true;
    // this.arr[item.x][item.y - 1].hightlight = true;
    // this.arr[item.x - 1][item.y ].hightlight = true;
    // this.arr[item.x + 1][item.y].hightlight = true;
  }
}
