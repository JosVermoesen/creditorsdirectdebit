import { Component, OnInit } from '@angular/core';
import { LanguageService } from './_services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ls: LanguageService) { }

  ngOnInit() {
    this.ls.setInitialAppLanguage();
  }
}
