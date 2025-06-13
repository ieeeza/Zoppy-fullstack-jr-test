import { Component } from '@angular/core';

@Component({
	selector: 'app-clientes-page',
	imports: [],
	templateUrl: './clientes-page.html',
	styleUrl: './clientes-page.css',
})
export class ClientesPage {
	nomeCliente: string = '';
	emailCliente: string = '';
	numeroCliente: string = '';

	CadastrarCliente() {}
}
