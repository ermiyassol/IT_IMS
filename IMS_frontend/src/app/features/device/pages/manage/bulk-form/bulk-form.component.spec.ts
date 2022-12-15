/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BulkFormComponent } from './bulk-form.component';

describe('BulkFormComponent', () => {
  let component: BulkFormComponent;
  let fixture: ComponentFixture<BulkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
