import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarProdutosPage } from './vizualizar-produtos-page';

describe('VizualizarProdutosPage', () => {
  let component: VizualizarProdutosPage;
  let fixture: ComponentFixture<VizualizarProdutosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarProdutosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
