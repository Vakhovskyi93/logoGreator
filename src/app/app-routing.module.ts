import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullItemComponent } from "./components/full-item/full-item.component";
import { ItemComponent } from "./components/item/item.component";
import { ListItemsComponent } from "./components/list-items/list-items.component";

const routes: Routes = [
  { path: '', component:ListItemsComponent},
  {path:"item/:id", component: FullItemComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
