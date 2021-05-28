import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;


  constructor( private activatedRoute: ActivatedRoute,
               private paisService: PaisService) { }

  ngOnInit(): void {
    // Estas son malas prácticas!
    // this.activatedRoute.params  //esto es desestructuración =>
    // .subscribe( ({ id })  =>{
    //   this.paisService.getPaisPorAlpha ( id )
    //   .subscribe( pais =>{
    //     console.log( pais );
    //   })
    // });

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id  }) => this.paisService.getPaisPorAlpha( id )  ),
      tap( console.log )
    )
    .subscribe( resp => {
      this.pais = resp 
    })

  }

}
