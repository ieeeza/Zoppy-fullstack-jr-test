import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPage } from './clientes-page';

describe('ClientesPage', () => {
  let component: ClientesPage;
  let fixture: ComponentFixture<ClientesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
