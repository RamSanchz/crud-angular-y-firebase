import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-angular-66a00-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    /* se crea un nuevo heroe para romper la referencia el cual sera igual al que teniamos solo que en este 
    se le podran eliminar atributos sin afectar a nuestra vista   */
    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo), delay(500));
  }

  private crearArreglo(heroesObj: Object): HeroeModel[] {
    const heroes: HeroeModel[] = [];

    if (heroesObj === null) {
      return [];
    }

    /* la respuesta viene en objeto por lo tanto se debe de pasar a un arreglo */
    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
