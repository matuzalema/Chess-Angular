import { Component, OnInit, Input } from '@angular/core';
import {Tile} from '../app.component';
import { NameService } from '../services/name.service';

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
  lastClicked: Tile;
  num = 8;
  name = '';
  // figures
  tower = "../../assets/images/tower.png";
  king = "../../assets/images/king1.png";
  hetman = "../../assets/images/hetman.png";
  horse = "../../assets/images/horse.png";
  pawn = "../../assets/images/pawn.png";
  runner = "../../assets/images/runner.png";

  public constructor(private nameService: NameService) {}

  ngOnInit(): void {
    this.createTails();
  }

  getTailClicked(item: Tile) {
    document.getElementById('incorrect-move-info').innerHTML = '';
    this.infAboutIncorrectClick(item);
    if (typeof this.lastClicked === 'undefined') {
      if (item.figure !== '') {
        this.highlightDependingOnFigure(item);
      }
    } else {
      // logic for last clicked figure
      // invalid move no figure clicked
      if (item.figure === '' && !item.highlight) {
        this.removeHighlight();
        this.lastClicked = (() => {return;})();
      } else if(item.figure !== '' && !item.highlight) {
        this.removeHighlight();
        this.highlightDependingOnFigure(item);
        this.lastClicked = item;
      } else {
        // move figure
        this.arr[item.x][item.y].figure = this.lastClicked.figure;
        this.arr[this.lastClicked.x][this.lastClicked.y].figure = '';
        this.lastClicked = (() => { return; })();
        this.removeHighlight();
      }
    }
  }

  infAboutIncorrectClick(item: Tile){
    if(item.figure === '' && !item.highlight && this.lastClicked.figure !== ''){
      document.getElementById('incorrect-move-info').innerHTML = this.nameService.name + ', ten ruch jest niedozwolony';
    }
  }

  highlightDependingOnFigure(item: Tile){
    if (item.figure === "king") {
      this.highlightPosibleKingMoves(item);
      this.lastClicked = item;
    } else if (item.figure === "tower") {
      this.highlightPosibleTowerMoves(item);
      this.lastClicked = item;
    } else if (item.figure === 'horse') {
      this.highlightPosibleHorseMoves(item);
      this.lastClicked = item;
    }
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
  //  ========= highlight horse movies ==========

  highlightPosibleHorseMoves(item: Tile) {
    // left top
    if (this.isInBoard(item.x - 2, item.y - 1)) {
      this.arr[item.x - 2][item.y - 1].highlight = true;
    }
    if (this.isInBoard(item.x - 1, item.y - 2)) {
      this.arr[item.x - 1][item.y - 2].highlight = true;
    }
    // right top
    if (this.isInBoard(item.x  + 1, item.y - 2)) {
      this.arr[item.x + 1][item.y  - 2].highlight = true;
    }
    if (this.isInBoard(item.x + 2, item.y - 1)) {
      this.arr[item.x + 2][item.y - 1].highlight = true;
    }
    // right bottom
    if (this.isInBoard(item.x + 2, item.y + 1)) {
      this.arr[item.x + 2][item.y + 1].highlight = true;
    }
    if (this.isInBoard(item.x + 1, item.y + 2)) {
      this.arr[item.x + 1][item.y + 2].highlight = true;
    }
    // left bottom
    if (this.isInBoard(item.x - 2, item.y + 1)) {
      this.arr[item.x - 2][item.y + 1].highlight = true;
    }
    if (this.isInBoard(item.x - 1, item.y + 2)) {
      this.arr[item.x - 1][item.y + 2].highlight = true;
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

  //  ========= highlight tower movies ==========
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
        if (this.arr[item.x][i].figure !== "") {
          break;
        }
      }
    }
    // left line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.x - 1; i >= 0; i--) {
        this.arr[i][item.y].highlight = true;
        if (this.arr[i][item.y].figure !== "") {
          break;
        }
      }
    }
    // right line
    if (this.isInBoard(item.x, item.y)) {
      for (let i = item.x + 1; i < 8; i++) {
        this.arr[i][item.y].highlight = true;
        if (this.arr[i][item.y].figure !== "") {
          break;
        }
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
        const tile = new Tile(i, j, false, "", "");
        this.arr[i][j] = tile;
      }
    }
    // this.arr[this.xValue][this.yValue].highlight = true;
  }
  getFigure(figure) {
    this.removeHighlight();
    this.choosenFigure = figure;
    const figureInf = document.getElementById("figure-info");

    if (this.choosenFigure === "tower") {
      figureInf.innerHTML = "wybrana figura to wieża";
    } else if (this.choosenFigure === "king") {
      figureInf.innerHTML = "wybrana figura to król";
    } else if (this.choosenFigure === "horse") {
      figureInf.innerHTML = "wybrana figura to skoczek";
    } else {
      figureInf.innerHTML = "wybierz inną figurę";
    }
  }
  getXValue(event) {
    this.xValue = event.target.value;
    document.getElementById('field-nr-validate').innerHTML = '';
    if (this.xValue < 1 || this.xValue > 8 || this.yValue.length > 1){
      document.getElementById('field-nr-validate').innerHTML = '*Wpisz cyfrę z zakresu 1-8';
    }
  }

  getYValue(event) {
    this.yValue = event.target.value;
    document.getElementById('field-letter-validate').innerHTML = '';
    if(this.yValue.length > 1){
      document.getElementById('field-letter-validate').innerHTML = '*Wpisz litery A-H';
    } else if ( this.yValue !== 'a' && this.yValue !== 'A' &&
      this.yValue !== 'b' && this.yValue !== 'B' &&
      this.yValue !== 'c' && this.yValue !== 'C' &&
      this.yValue !== 'd' && this.yValue !== 'D' &&
      this.yValue !== 'e' && this.yValue !== 'E' &&
      this.yValue !== 'f' && this.yValue !== 'F' &&
      this.yValue !== 'g' && this.yValue !== 'G' &&
      this.yValue !== 'f' && this.yValue !== 'F') {
      document.getElementById('field-letter-validate').innerHTML = '*Wpisz litery A-H';
    } else {
      document.getElementById('field-letter-validate').innerHTML = '';
    }
  }
  onSubmit() {
    this.yValue = this.hangeYvalueToLetter();
    this.xValue = this.xValue - 1;
    this.arr[this.xValue][this.yValue].figure = this.choosenFigure;
    this.xValue = null;
    this.yValue = null;
  }

  hangeYvalueToLetter(){
    if (this.yValue === 'a' || this.yValue === 'A') {
      return 0;
    } else if (this.yValue === 'b' || this.yValue === 'B') {
      return 1;
    } else if (this.yValue === 'c' || this.yValue === 'C') {
      return 2;
    } else if (this.yValue === 'd' || this.yValue === 'D') {
      return 3;
    } else if (this.yValue === 'e' || this.yValue === 'E') {
      return 4;
    } else if (this.yValue === 'f' || this.yValue === 'F') {
      return 5;
    } else if (this.yValue === 'g' || this.yValue === 'G') {
      return 6;
    } else if (this.yValue === 'h' || this.yValue === 'H') {
      return 7;
    }
  }
}
