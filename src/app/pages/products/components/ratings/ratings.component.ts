import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  @Input() editing: boolean = false;
  @Input() maxRating = 5; 
  @Input() currentRating: number = 0; 
  @Output() ratingChange = new EventEmitter<number>(); 

  stars: number[] = [];

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(0); 
  }

  rate(value: number) {
    if (this.editing) {
      this.currentRating = value; 
      this.ratingChange.emit(this.currentRating); 
    }
  }

  hasDecimal(value: number): boolean {
    return value % 1 !== 0;
  }

  isHalf(index: number) {
    return index === Math.floor(this.currentRating);
  }


}
