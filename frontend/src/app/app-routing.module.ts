import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "search", component:SearchpageComponent
  },
  {
    path: "search/:searchItem", component: HomeComponent
  },
  {
    path: "tag/:tag", component: HomeComponent
  },
  {
    path: "food/:id", component: FoodpageComponent
  },
  { 
    path: "cart", component: CartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
