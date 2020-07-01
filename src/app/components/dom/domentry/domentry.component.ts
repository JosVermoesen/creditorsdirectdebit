import { Component, OnInit, ViewChild } from '@angular/core';
import { version } from '../../../../../package.json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import * as moment from 'moment';

import { Uuid } from '../../../_functions/uuid';
import { DomService } from '../../../_services/dom.service';
import { DomEntry } from '../../../_models/domEntry';
import { checkIBAN } from 'vsoftvalidation';

@Component({
  selector: 'app-domentry',
  templateUrl: './domentry.component.html',
  styleUrls: ['./domentry.component.css']
})
export class DomEntryComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  bsModalRef: BsModalRef;
  version: string = version;

  warning: string;
  domJson: DomEntry[];

  domEntryForm: FormGroup;

  btnAddOrUpdate: string;
  tabAddOrEdit: string;
  isNew = true;

  readyForExport = false;
  countEntries: number;

  locked = false;
  lockLabel = this.ts.instant('CDDENTRY.UnLockButtonLabel');

  endToEndRequiredMessage: string;
  amountRequiredMessage: string;
  amountMinMaxMessage: string;
  mandateIdRequiredMessage: string;
  mandateStartDateRequiredMessage: string;
  clientNameRequiredMessage: string;
  ibanRequiredMessage: string;
  ibanMinMaxMessage: string;
  communicationRequiredMessage: string;
  validationMessages: any;

  constructor(
    private domService: DomService,
    private fb: FormBuilder,
    private ts: TranslateService
  ) { }

  ngOnInit() {
    this.initErrorMessages();
    this.domJson = JSON.parse(localStorage.getItem('cddEntries_Template'));
    // Subscribe to the selectedLog observable
    this.domService.selectedDomEntry.subscribe((entry: DomEntry) => {
      if (entry.id !== null) {
        this.tabAddOrEdit = this.ts.instant('CDDENTRY.TabEditLabel');
        this.btnAddOrUpdate = this.ts.instant('CDDENTRY.UpdateButtonLabel');
        this.lockSwitch();
        this.selectTab(1);

        this.refreshErrorMessages();
        const dummyNotProvided = 'NOTPROVIDED';
        this.domEntryForm = this.fb.group({
          id: [entry.id],
          endToEndReference: [dummyNotProvided, Validators.required], // [entry.endToEndReference, Validators.required],
          amount: [
            entry.amount,
            [Validators.required, Validators.min(0.01), Validators.max(3000)]
          ],
          mandateId: [entry.mandateId, Validators.required],
          mandateStartDate: [entry.mandateStartDate, Validators.required],
          clientName: [entry.clientName, Validators.required],
          clientIban: [
            entry.clientIban,
            [
              Validators.required,
              Validators.minLength(12),
              Validators.maxLength(16)
            ]
          ],
          communication: [entry.communication, Validators.required]
        });
        this.isNew = false;
      } else {
        this.clearState();
      }
    });
  }

  initErrorMessages() {
    this.ts.get('CDDENTRY.EndToEndRequiredMessage').subscribe(res => {
      this.endToEndRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.AmountRequiredMessage').subscribe(res => {
      this.amountRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.AmountMinMaxMessage').subscribe(res => {
      this.amountMinMaxMessage = res;
    });
    this.ts.get('CDDENTRY.MandateIdRequiredMessage').subscribe(res => {
      this.mandateIdRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.MandateStartDateRequiredMessage').subscribe(res => {
      this.mandateStartDateRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.ClientNameRequiredMessage').subscribe(res => {
      this.clientNameRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.IbanRequiredMessage').subscribe(res => {
      this.ibanRequiredMessage = res;
    });
    this.ts.get('CDDENTRY.IbanMinMaxMessage').subscribe(res => {
      this.ibanMinMaxMessage = res;
    });
    this.ts.get('CDDENTRY.CommunicationRequiredMessage').subscribe(res => {
      this.communicationRequiredMessage = res;
    });
  }

  refreshErrorMessages() {
    this.validationMessages = {
      endToEndReference: [
        { type: 'required', message: this.endToEndRequiredMessage }
      ],
      amount: [
        { type: 'required', message: this.amountRequiredMessage },
        {
          type: 'min',
          message: this.amountMinMaxMessage
        },
        {
          type: 'max',
          message: this.amountMinMaxMessage
        }
      ],
      mandateId: [{ type: 'required', message: this.mandateIdRequiredMessage }],
      mandateStartDate: [
        { type: 'required', message: this.mandateStartDateRequiredMessage }
      ],
      clientName: [
        { type: 'required', message: this.clientNameRequiredMessage }
      ],

      clientIban: [
        { type: 'required', message: this.ibanRequiredMessage },
        {
          type: 'minlength',
          message: this.ibanMinMaxMessage
        },
        {
          type: 'maxlength',
          message: this.ibanMinMaxMessage
        }
      ],
      communication: [
        { type: 'required', message: this.communicationRequiredMessage }
      ]
    };
  }

  ibanMatchValidator() {
    /* return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true }; */
    const ibanValid = checkIBAN('910076876640', true, true);
    console.log(ibanValid);
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  lockSwitch() {
    this.locked = !this.locked;
    if (this.locked) {
      this.ts.get('CDDENTRY.UnLockButtonLabel').subscribe((res: string) => {
        this.lockLabel = res;
      });
    } else {
      this.ts.get('CDDENTRY.LockButtonLabel').subscribe((res: string) => {
        this.lockLabel = res;
      });
    }
  }

  onSubmit() {
    if (this.domEntryForm.valid) {
      if (this.domEntryForm.value.endToEndReference == '') {
        this.domEntryForm.value.endToEndReference = 'NOTPROVIDED'
      }
      const mandate = this.domEntryForm.value.mandateStartDate;
      const momentDate = moment(mandate).format('YYYY-MM-DD');
      this.domEntryForm.value.mandateStartDate = momentDate;
      const domEntry: DomEntry = Object.assign({}, this.domEntryForm.value);
      if (this.isNew) {
        this.domService.addDomEntry(domEntry);
      } else {
        this.domService.updateDomEntry(domEntry);
      }
    }
    this.selectTab(0);
    this.clearState();
  }

  clearState() {
    this.locked = true;
    this.lockSwitch();
    this.isNew = true;
    this.ts.get('CDDENTRY.TabAddLabel').subscribe((res: string) => {
      this.tabAddOrEdit = res;
    });
    this.ts.get('CDDENTRY.SaveButtonLabel').subscribe((res: string) => {
      this.btnAddOrUpdate = res;
    });
    this.readyForExport = false;

    this.domEntryForm = this.fb.group({
      id: Uuid(),
      endToEndReference: ['NOTPROVIDED', Validators.required],
      amount: [
        null,
        [Validators.required, Validators.min(0.01), Validators.max(3000)]
      ],
      mandateId: [null, Validators.required],
      mandateStartDate: [null, Validators.required],
      clientName: [null, Validators.required],
      clientIban: [
        null,
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(16)
        ]
      ],
      communication: [null, Validators.required]
    });
    this.domService.clearState();
    this.domJson = JSON.parse(localStorage.getItem('cddEntries_Template'));
    this.refreshErrorMessages();
  }
}
