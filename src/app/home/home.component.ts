import { Component, OnInit } from '@angular/core';
// import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { NameService } from '../services/name.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public constructor(private nameService: NameService) { }
  name: string;

  ngOnInit(): void {
  }
  showNamePrompt(){
    this.nameService.showPrompt();
  }
}
