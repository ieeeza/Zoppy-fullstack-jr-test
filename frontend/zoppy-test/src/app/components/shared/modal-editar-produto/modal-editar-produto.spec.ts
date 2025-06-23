import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProduto } from './modal-editar-produto';

describe('ModalEditarProduto', () => {
  let component: ModalEditarProduto;
  let fixture: ComponentFixture<ModalEditarProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarProduto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
