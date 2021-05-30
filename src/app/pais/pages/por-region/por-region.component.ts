import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right:6px;
    }
    `
  ]
})
export class PorRegionComponent {


  regiones     : string[] = ['africa','americas','asia','europe','oceania'];
  regionActiva : string = '';
  hayError     : boolean = false;

  paises: Country[] = [];

  constructor( private paisService: PaisService) { }

  getClassCSS( region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }


  activarRegion( region: string ){
    this.hayError = false;
    this.regionActiva = region; 
    this.paises = [];
    //TODO: Hacer una carga a los servicios
    this.paisService.searchRegion(region)
    .subscribe( (resp) =>{
      this.paises = resp;
    }, (err) =>{
      this.hayError = true;
    })
  }


}
