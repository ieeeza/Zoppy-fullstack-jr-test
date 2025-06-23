import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-modal-editar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./modal-editar-cliente.html",
  styleUrls: ["./modal-editar-cliente.css"],
})
export class ModalEditarComponent {
  @Input() mostrar: boolean = false;

  @Input() nome: string = "";
  @Input() email: string = "";
  @Input() numero: string = "";

  @Output() salvar = new EventEmitter<{
    nome: string;
    email: string;
    numero: string;
  }>();

  @Output() fechar = new EventEmitter<void>();

  verificarInputs(): boolean {
    const inputsFormatado = {
      nome: this.nome.trim(),
      email: this.email.trim(),
      numero: this.numero.trim(),
    };

    if (
      !inputsFormatado.nome ||
      !inputsFormatado.email ||
      !inputsFormatado.numero
    ) {
      alert("Preencha todos os campos, por favor!");
      return false;
    } else if (inputsFormatado.nome.length < 10) {
      alert("Digite o nome completo");
      return false;
    } else if (
      !inputsFormatado.email.includes("@") ||
      !inputsFormatado.email.includes(".com")
    ) {
      alert("Digite um email válido!");
      return false;
    }

    return true;
  }

  salvarEdicao() {
    if (!this.verificarInputs()) {
      return;
    }

    this.salvar.emit({
      nome: this.nome,
      email: this.email,
      numero: this.numero,
    });
  }

  fecharModal() {
    this.fechar.emit();
  }
}
