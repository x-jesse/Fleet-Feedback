import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconstructComponent } from './reconstruct.component';

describe('ReconstructComponent', () => {
  let component: ReconstructComponent;
  let fixture: ComponentFixture<ReconstructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconstructComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
