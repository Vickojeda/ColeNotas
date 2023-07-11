import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ListaCursoPage } from './lista-curso.page';

describe('ListaCursoPage', () => {
  let component: ListaCursoPage;
  let fixture: ComponentFixture<ListaCursoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
