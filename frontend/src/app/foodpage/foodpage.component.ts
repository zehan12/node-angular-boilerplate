import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { FoodService } from '../services/food/food.service';
import { Foods } from '../shared/models/Foods';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
export class FoodpageComponent implements OnInit {
  food!: Foods;
  constructor(
    private activateRoute: ActivatedRoute,
    private router:Router,
    private foodService: FoodService,
    private cartServices:CartService
  ) {
    activateRoute.params.subscribe((params) => {
      if (params['id']) {
        this.food = foodService.getFoodById(params['id']);
      }
    })
  }
  ngOnInit(): void {

  }

  addToCart(){
    this.cartServices.addToCart(this.food);
    this.router.navigateByUrl("/cart")
  }
}
