import { TarefaServiceService } from './../../services/tarefa-service.service';
import { Component } from '@angular/core';
import { Tarefa } from '../../interfaces/Tarefa';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas-component.component.html',
  styleUrl: './tarefas-component.component.css',
})
export class TarefasComponentComponent {
  tarefas: Tarefa[] = [];
  TarefaForm: FormGroup = new FormGroup({});

  constructor(
    private TarefaService: TarefaServiceService,
    private formBuilder: FormBuilder
  ) {
    this.TarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
    });
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir() {
    if (this.TarefaForm.valid) {
      const tarefaNova: Tarefa = {
        titulo: this.TarefaForm.value.titulo,
        descricao: this.TarefaForm.value.descricao,
        dataVencimento: this.TarefaForm.value.dataVencimento,
        id: this.generateRandomString(6),
      };
      this.TarefaForm.reset();
      this.TarefaService.adicionar(tarefaNova);
      alert('Cadastrado com sucesso!');
    } else {
      alert('Preencha todos os campos!');
    }
  }

  listar(): void {
    this.tarefas = this.TarefaService.listar();
  }

  remover(id: string): void {
    this.TarefaService.remover(id);
    alert('Removido com sucesso');
  }

  ngOnInit(): void {
    this.listar();
  }
}
