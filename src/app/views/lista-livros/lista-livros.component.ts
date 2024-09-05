import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  busca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  converteParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }

  buscarLivros() {
    this.subscription = this.service.buscar(this.busca).subscribe({
      next: (data) => (this.listaLivros = this.converteParaLivros(data)),
      error: (erro) => console.error(erro),
      // complete: () => console.log('Observable completado'),
    });
  }
}
