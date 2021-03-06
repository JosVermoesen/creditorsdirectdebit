import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { LanguageComponent } from './language/language.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  bsModalRef: BsModalRef;

  faGlobe = faGlobe;

  constructor(
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

  ngOnInit() { }

  onLanguageModal() {
    const lblTitle = this.translate.instant('NAVBAR.LanguageModalTitle');
    const lblCloseBtnName = this.translate.instant(
      'NAVBAR.LanguageModalCloseBtnName'
    );

    const initialState = {
      title: lblTitle
    };
    this.bsModalRef = this.modalService.show(LanguageComponent, {
      initialState
    });
    this.bsModalRef.content.onSelected.subscribe(() => {
      // when closed do something eventualy
    });

    this.bsModalRef.content.closeBtnName = lblCloseBtnName;
  }
}
