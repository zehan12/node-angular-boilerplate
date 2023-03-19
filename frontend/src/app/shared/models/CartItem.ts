import { Foods } from "./Foods";

export class CartItems {
    constructor(food: Foods) {
        this.food = food;
    }

    food: Foods;
    quantity: number = 1;
    get price(): number {
        return this.food.price * this.quantity;
    }

}
