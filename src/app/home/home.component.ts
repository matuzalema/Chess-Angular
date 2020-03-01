import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  boardLink;
  name = "dupa";
  routerPath = "";
  constructor(private router: Router) {}

  ngOnInit(): void {}
  showPrompt() {
    this.name = prompt("wpisz swoje imię");
    if (this.name === "") {
      this.router.navigate(["/home"]);
    } else {
      this.router.navigate(["/board"]);
    }
  }
  // jadzia() {
  //   if (name !== '') {
  //     this.routerPath = "/home";
  //     } else {
  //    this.routerPath = "/board";
  //     }
  //   }
}
