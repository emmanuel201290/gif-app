import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: "./card-list.component.html"
})

export class CardListComponent  {

  //@input --> recibe parametros pasados desde el padre.
  @Input()
  public gifs: Gif[] = [];
}
