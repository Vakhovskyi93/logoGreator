import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
  Output
} from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../../data.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit  {
  cardsPlace;


  @Input() card:any;
  @Output() click = new EventEmitter( )
  @ViewChild('target') target;
  private animateThis: ElementRef;
  private context: CanvasRenderingContext2D;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private server: DataService) { }

  ngOnInit(): void {
    this.cardsPlace = document.getElementById('cardsPlace');
    this.draw(this.card)
  };
  draw(item) {
    let text = this.card.text;
    let font = this.card.font;
    let size = this.card.fontSize;

    const card = this.renderer.createElement('canvas');
    const context = card.getContext('2d')
    this.renderer.listen(card, 'click', (evt) => {
    this.server.checkItem(this.card)
    this.router.navigate([`/item/${this.card.id}`])
    });

    let image = new Image();
    image.onload = function() {
      context.drawImage(image, 0, 0);

      let imageData = context.getImageData(0,0, image.width, image.height);
      context.createImageData(imageData);
      context.font = `${size}px ${font}`;
      context.textBaseline = 'middle';
      context.textAlign = 'left';
      const x = (card as HTMLCanvasElement).width / 1.8;
      const y = (card as HTMLCanvasElement).height /1.5;
      context.fillText(`${text}`, x, y);

    };
    image.src = item.view;
    this.renderer.appendChild( this.cardsPlace,card );
  }

}
