import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Foods } from '../shared/models/Foods';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Foods[] = [];
  constructor(private fs: FoodService, private route: ActivatedRoute) { }

  // this lifecycle hook work as componentDidMount || useEffect
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this will search item from params 
      if (params['searchItem']) {
        this.foods = this.fs.getAll().filter((food) => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
      } else if ( params['tag'] ) {
        this.foods = this.fs.getAllFoodByTags(params['tag'])
        // it will this display whole list of items
      } else {
        this.foods = this.fs.getAll();
      }
    })
  }
}
