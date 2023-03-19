import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItems } from 'src/app/shared/models/CartItem';
import { Foods } from 'src/app/shared/models/Foods';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  private cart: Cart = new Cart();

  addToCart(food: Foods): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if (cartItem) {
      console.log(cartItem, "is already created")
      cartItem.quantity++
      this.changeQuantity(food.id, cartItem.quantity);
      return;
    }
    console.log(food, "is added created")
    this.cart.items.push(new CartItems(food));
  }
  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId)
  }

  changeQuantity(quantity: number, foodId: number): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
  }

  decrementQuantity(foodId: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (cartItem) {
      if (cartItem.quantity === 1) return;
      cartItem.quantity = cartItem.quantity - 1;
      this.changeQuantity(cartItem.food.id, cartItem.quantity);
    }
    console.log(cartItem, "food id", cartItem?.quantity);
  }

  getCart(): Cart {
    return this.cart;
  }
}
