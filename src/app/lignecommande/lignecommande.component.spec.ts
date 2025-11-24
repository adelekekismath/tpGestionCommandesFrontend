import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignecommandeComponent } from './lignecommande.component';

describe('LignecommandeComponent', () => {
  let component: LignecommandeComponent;
  let fixture: ComponentFixture<LignecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignecommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
