import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ItemComponent } from './components/item/item.component';
import { DataService } from "./data.service";
import { FullItemComponent } from './components/full-item/full-item.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    ItemComponent,
    FullItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
