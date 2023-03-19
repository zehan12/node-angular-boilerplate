import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItems } from '../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.setCart()
  }
  ngOnInit(): void {

  }
  setCart() {
    this.cart = this.cartService.getCart();
    console.log(this.cart)
  }

  removeFromCart(cartItem: CartItems) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItems, quanityInString: string) {
    const quantity = parseInt(quanityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  decreaseQuantity(id:number){
    this.cartService.decrementQuantity(id);
    this.setCart()
  }

  increaseQuantity(cartItem:CartItems){
    this.cartService.addToCart(cartItem.food);
    this.setCart()
  }

}
