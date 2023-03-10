import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private serviceUrl : string = 'https://api.giphy.com/v1/gifs';
  private apiKey     : string = '4rxYVCoHAY1KYR57QgjfE40uuyDjNjm4';
  private _historial : string[] = [];
  public resultados  : Gif[] = []; 


  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){ 
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  
  BuscarGifs(query: string = ''){
  
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.slice(0,10);

      //LOCALSTORAGE
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }


    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    //Search Endpoint
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search?` ,{ params })
        .subscribe( resp => {
            this.resultados = resp.data;
            localStorage.setItem('resultados',JSON.stringify(resp.data));
        });
  }

}
