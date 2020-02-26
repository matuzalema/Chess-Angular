import { Component, OnInit, Input } from '@angular/core';
import {Tile} from '../app.component';

@Component({
  selector: 'app-cheesboard',
  templateUrl: './cheesboard.component.html',
  styleUrls: ['./cheesboard.component.scss']
})
export class CheesboardComponent implements OnInit {
  arrayTile;

  @Input() arr;
  constructor() { }

  ngOnInit(): void {
  }

  getColor(item: Tile): string {
    return (item.x + item.y) % 2 === 0 ? '#F0D9B5' : '#B58863';
  }
}
