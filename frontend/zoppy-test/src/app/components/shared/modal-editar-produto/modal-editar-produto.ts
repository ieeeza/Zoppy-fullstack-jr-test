import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-modal-editar-produto",
  imports: [FormsModule, CommonModule],
  templateUrl: "./modal-editar-produto.html",
  styleUrl: "./modal-editar-produto.css",
})
export class ModalEditarProduto {
  @Input() mostrar: boolean = false;

  @Input() nome: string = "";
  @Input() descricao: string = "";
  @Input() preco: string = "";

  @Output() salvar = new EventEmitter<{
    nome: string;
    descricao: string;
    preco: string;
  }>();

  @Output() fechar = new EventEmitter<void>();

  verificarInputs(): boolean {
    const inputsFormatado = {
      nome: this.nome.trim(),
      descricao: this.descricao.trim(),
      preco: this.preco.trim(),
    };

    if (
      !inputsFormatado.nome ||
      !inputsFormatado.descricao ||
      !inputsFormatado.preco
    ) {
      alert("Preencha todos os campos, por favor!");
      return false;
    }

    return true;
  }

  permitirNumerosEPontoVirgula(event: KeyboardEvent) {
    const char = event.key;

    if (!/^[0-9.,]$/.test(char)) {
      event.preventDefault();
    }
  }

  bloquearTextoInvalido(event: ClipboardEvent) {
    const texto = event.clipboardData?.getData("text") ?? "";

    if (!/^[0-9.,]*$/.test(texto)) {
      event.preventDefault();
    }
  }

  salvarEdicao() {
    if (!this.verificarInputs()) {
      return;
    }

    this.salvar.emit({
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
    });
  }

  fecharModal() {
    this.fechar.emit();
  }
}
