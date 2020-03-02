import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  name: string;

  ngOnInit(): void {}
  showPrompt() {
    this.name = prompt("wpisz swoje imię");
    if (this.name === "") {
      this.router.navigate(["/home"]);
      document.getElementById('name-validate-field').innerHTML = 'Wpisz prawidłowe imię';
    } else {
      this.router.navigate(["/board"]);
    }
  }
}
