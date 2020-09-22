import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { DataService } from "../../data.service";
import { ItemCard } from "../../model/itemCard";


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  cards: ItemCard[];



  constructor(
    private service: DataService
  ) { }
  ngAfterViewInit() {}

  ngOnInit(): void {
     this.service.downloaderFontsFamilyName()
     this.cards = this.service.getCards()
  }


}
