import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent {
  
  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ){}

  buscar(){
    
    const valor = this.txtbuscar.nativeElement.value;  
    if(valor.trim().length === 0 ){
      return;
    }
    this.gifsService.BuscarGifs( valor );
    this.txtbuscar.nativeElement.value = '';  
  }


}
