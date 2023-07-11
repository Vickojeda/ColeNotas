import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        IonicModule.forRoot()
      ],
      declarations: [
        HomePage
      ],
    }).compileComponents();
    
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { email: 'test@dummy.cl'} } } as any);
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});