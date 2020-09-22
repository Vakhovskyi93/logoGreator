import { Component, OnInit, Renderer2, } from '@angular/core';
import { DataService } from "../../data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-full-item',
  templateUrl: './full-item.component.html',
  styleUrls: ['./full-item.component.css']
})
export class FullItemComponent implements OnInit {
  item;
  canvasEl;
  fillColor = 'blue';
  strokeStyle = 'blue'
  fontfamilyList;

  constructor(
    private router: Router,
    private service: DataService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.service.getCards()
    this.canvasEl = document.getElementById('canvas');
    this.item = this.service.item;


    if (!this.item){
      this.router.navigate([''])
    } else {
      this.draw()
    }
    this.fontfamilyList = this.service.fontFamily

  }

  loadingNewFont(){
    this.service.loadFont(this.item.font)
    };

  lookat(){
    console.log(this.item)
    let old = document.querySelector('canvas');
    this.renderer.removeChild(this.canvasEl, old);
    this.draw();
  }

  save(){
    this.service.saveItem(this.item);
    this.router.navigate([''])
  };

  draw() {
    const img = this.renderer.createElement('canvas');
    const ctx = img.getContext('2d')
    let text = this.item.text;
    let font = this.item.font;
    let size = this.item.fontSize || 35;

    let image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      ctx.font = `${size}px ${font}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      const x = (img as HTMLCanvasElement).width / 1.8;
      const y = (img as HTMLCanvasElement).height /1.5;
      ctx.fillText(`${text}`, x, y);
    };
    image.src =  this.item.view;
    this.renderer.appendChild( this.canvasEl,img );
  }
  getShape(shape){
    this.item.shape.shape = shape;
    let canvas = this.renderer.createElement('canvas');
    let context = canvas.getContext("2d");
    if( shape == 'square'){

      context.beginPath();
      context.rect(20, 30, 100, 100);
      context.closePath();
      context.strokeStyle = this.strokeStyle;
      context.fillStyle = this.fillColor;
      context.fill();
      context.stroke();

    }
    if( shape == 'round') {

      context.beginPath();
      context.arc(`${this.item.shape.round.x}`, `${this.item.shape.round.y}`, `${this.item.shape.round.radius}`, 0, Math.PI*2, false);
      context.closePath();
      context.strokeStyle = this.strokeStyle;
      context.fillStyle = this.fillColor;
      context.fill();
      context.stroke();
      this.item.view = canvas.toDataURL()
      console.log(this.item.view)
    }
    if (shape == 'triangle'){

      context.beginPath();
      context.moveTo(20, 120);
      context.lineTo(120, 120);
      context.lineTo(70, 30);
      context.closePath();
      context.strokeStyle = "orange";
      context.fillStyle = "orange";
      context.fill();
      context.stroke()
    }
    this.item.view = canvas.toDataURL()
    console.log(this.item.view)
    this.lookat()
  }
}
