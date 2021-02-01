import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  deleteHeroe(heroe: HeroeModel, i: number): void {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        /* eliminamos el heroe de nuestro arreglo para que se renderice la pagina */
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }
    });
  }
}
