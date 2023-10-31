import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gif.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'K4gDtloAiZ5D6aVYiPBovZ1BOPLwlWI1';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
     this.loadLocalStorage();
     console.log('Gifs service ready')
  }

  get tagsHistory(){
    return [...this._tagsHistory];//el spread operator para crear una copia
  }

  private organizeHistory(tag: string){
     tag = tag.toLowerCase();
     if( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag !== tag)
     }

     this._tagsHistory.unshift( tag )
     this._tagsHistory = this.tagsHistory.splice(0,10);
     this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if( this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
    //! = not null assertion operator - nunca sera null
  }



   searchTag( tag: string): void {
    if( tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', tag)

    //Observable - Es un objeto que emite valores -
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
        .subscribe( resp  => {
          this.gifList = resp.data;
          console.log({gifs: this.gifList})
        })

   // fetch('http://api.giphy.com/v1/gifs/search?api_key=K4gDtloAiZ5D6aVYiPBovZ1BOPLwlWI1&q=valorant&limit=10')


  }

}


//en javascript los arreglos pasan por referencia.
