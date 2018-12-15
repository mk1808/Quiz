import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMainPanelComponent } from './student-main-panel.component';

describe('StudentMainPanelComponent', () => {
  let component: StudentMainPanelComponent;
  let fixture: ComponentFixture<StudentMainPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMainPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
