import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USCasesComponent } from './uscases.component';

describe('USCasesComponent', () => {
  let component: USCasesComponent;
  let fixture: ComponentFixture<USCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
