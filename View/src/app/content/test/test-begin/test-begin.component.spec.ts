import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBeginComponent } from './test-begin.component';

describe('TestBeginComponent', () => {
  let component: TestBeginComponent;
  let fixture: ComponentFixture<TestBeginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBeginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
