import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosPage } from './produtos-page';

describe('ProdutosPage', () => {
  let component: ProdutosPage;
  let fixture: ComponentFixture<ProdutosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
