import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `

  ]
})
export class PorPaisComponent {

  termino    : string = '';
  hayError   : boolean = false; 
  paises     : Country[] = [];
  paisesSugeridos     : Country[] = [];
  mostrarSugerencias : boolean = false;
 

  constructor( private paisService: PaisService) { }

 
  buscar(termino: string ) {
    this.hayError = false; 
    this.termino = termino;
    this.mostrarSugerencias = true;


    this.paisService.buscarPais( this.termino )
    .subscribe( (resp)  => {
      console.log( resp );
      this.paises = resp;
    }, (err) => {
      this.hayError = true; 
    }
    ) ; 
  }


  sugerencias ( termino: string ){
    this.hayError = false; 
    this.termino = termino;
    // Crear sugerencias ak 
    this.mostrarSugerencias = true;
    this.paisService.buscarPais ( termino )
    .subscribe( paises =>{
      this.paisesSugeridos = paises.splice(0,5)
    }, (err) =>{
      this.paisesSugeridos = [];
    });
  }


  buscarSugerido( termino: string ) {
    this.buscar(termino);
  }

}
