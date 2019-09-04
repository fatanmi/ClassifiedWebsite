import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSiteFooterComponent } from './main-site-footer.component';

describe('MainSiteFooterComponent', () => {
  let component: MainSiteFooterComponent;
  let fixture: ComponentFixture<MainSiteFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSiteFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSiteFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
