import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarPedidosPage } from './vizualizar-pedidos-page';

describe('VizualizarPedidosPage', () => {
  let component: VizualizarPedidosPage;
  let fixture: ComponentFixture<VizualizarPedidosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarPedidosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
