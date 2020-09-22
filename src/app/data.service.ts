import { Injectable } from '@angular/core';

import {cards} from './data'
import {ItemCard} from "./model/itemCard";
import * as WebFont from 'webfontloader';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cards = cards
  item: ItemCard[];
  googleLink = 'https://www.googleapis.com/webfonts/v1/webfonts?key=';
  api = "AIzaSyDKz8R5FEgkg4ZyA6ZTMhlYUpqugzePRR0";
  fontFamily = [];
  constructor(

  ) {

  }

  getCards() {
    if(!sessionStorage.length ){
      this.cards.map( i => {
        let jsonItem = JSON.stringify( i )
        sessionStorage.setItem( i.id, jsonItem )

      })
      return this.getLocalStorageItems()
    } else {
      return this.getLocalStorageItems()

    }
  }

  getLocalStorageItems(){
    let result=[]
    for( let i=0; i < sessionStorage.length; i++){
      let key = sessionStorage.key(i)
      result.push(JSON.parse( sessionStorage.getItem( key )))
    }
    return result
  }

  async downloaderFontsFamilyName(){
      await fetch(`${this.googleLink}${this.api}`)
        .then(res => res.json())
        .then( res =>  {
          res.items.map(item=>{
            this.fontFamily.push(item.family)
          })
        })
  }

  checkItem(item){
    this.item = item
  }

  saveItem(newItem){
    let localStorageItems = this.getLocalStorageItems()
    localStorageItems.map( item => {
        if( item.id == newItem.id) {
          sessionStorage.setItem(item.id, JSON.stringify(newItem))
        }

    })
  }

  loadFont(item){
    return WebFont.load({
      google: {
        families: [item]
      }
    })
  }
}
