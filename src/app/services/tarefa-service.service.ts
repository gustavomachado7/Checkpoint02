import { Injectable } from '@angular/core';
import { Tarefa } from '../interfaces/Tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaServiceService {
  constructor() {}

  //Esta lista virá da API
  tarefas: Tarefa[] = [];

  listar(): Tarefa[] {
    return this.tarefas;
  }

  remover(id: string) {
    const Tarefa = this.tarefas.find((c) => c.id == id);

    if (Tarefa) {
      const index = this.tarefas.indexOf(Tarefa);
      this.tarefas.splice(index, 1);
    }
  }

  adicionar(Tarefa: Tarefa) {
    this.tarefas.push(Tarefa);
  }
}
