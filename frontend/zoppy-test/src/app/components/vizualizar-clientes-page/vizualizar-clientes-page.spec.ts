import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarClientesPage } from './vizualizar-clientes-page';

describe('VizualizarClientesPage', () => {
  let component: VizualizarClientesPage;
  let fixture: ComponentFixture<VizualizarClientesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarClientesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
