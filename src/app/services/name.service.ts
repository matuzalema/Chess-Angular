import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NameService {
name = 'Adam';
subjectName = new Subject();

  constructor(private router: Router) { }

  showPrompt() {
    this.name = prompt('wpisz swoje imię');
    if (this.name === '') {
      this.router.navigate(['/home']);
      document.getElementById('name-validate-field').innerHTML = 'Wpisz swoje imię';
    } else {
      this.router.navigate(['/board']);
    }
  }
}
