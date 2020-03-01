import { Component, OnInit, Input } from '@angular/core';
import {Tile} from '../app.component';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: "app-cheesboard",
  templateUrl: "./cheesboard.component.html",
  styleUrls: ["./cheesboard.component.scss"]
})
export class CheesboardComponent implements OnInit {
  arr: Tile[][] = [];
  choosenFigure = "";
  xValue = null;
  yValue = null;
  // figures
  tower = "../../assets/images/tower.png";
  king = "../../assets/images/king1.png";
  hetman = "../../assets/images/hetman.png";
  horse = "../../assets/images/horse.png";
  pawn = "../../assets/images/pawn.png";
  runner = "../../assets/images/runner.png";

  constructor() {}

  ngOnInit(): void {
    this.createTails();
  }
  addHightlight(item: Tile) {
    return (item.highlight = true);
  }

  getColor(item: Tile): string {
    if (item.highlight) {
      return "#255F69";
    } else if ((item.x + item.y) % 2 === 0) {
      return "#ddbca1";
    } else if ((item.x + item.y) % 2 !== 0) {
      return "#B58863";
    }
  }
  isInBoard(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false;
    } else {
      return true;
    }
  }
  //  ========= highlight king movies ==========

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

  //  ========= highlight king movies ==========
  highlightPosibleTowerMoves(item: Tile) {
    // top line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.y - 1; i >= 0; i--) {
        this.arr[item.x][i].highlight = true;
        if (this.arr[item.x][i].figure !== "") {
          break;
        }
      }
    }
    // bottom line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.y + 1; i < 8; i++) {
        this.arr[item.x][i].highlight = true;
      }
    }
    // left line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.x - 1; i >= 0; i--) {
        this.arr[i][item.y].highlight = true;
      }
    }
    // right line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.x + 1; i < 8; i++) {
        this.arr[i][item.y].highlight = true;
      }
    }
  }

  getTailClicked(item: Tile) {
    console.log("Kliknięty tile: " + "x: " + item.x + "  y: " + item.y);
    this.removeHighlight();
    if (item.choosenFile) {
      if (item.figure === "king") {
        this.highlightPosibleKingMoves(item);
      } else {
        this.highlightPosibleTowerMoves(item);
      }
    }
  }
  removeHighlight() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.arr[i][j].highlight = false;
      }
    }
  }

  createTails() {
    for (let i = 0; i < 8; i++) {
      this.arr[i] = [];
      for (let j = 0; j < 8; j++) {
        const tile = new Tile(i, j, false, "", false, "");
        this.arr[i][j] = tile;
      }
    }
    // this.arr[this.xValue][this.yValue].highlight = true;
    console.log(this.arr);
  }
  getFigure(figure) {
    this.choosenFigure = figure;
    const figureInf = document.getElementById("figure-info");

    if (this.choosenFigure === "tower") {
      figureInf.innerHTML = "wybrana figura to wieża";
    } else if (this.choosenFigure === "king") {
      figureInf.innerHTML = "wybrana figura to król";
    }
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
}
