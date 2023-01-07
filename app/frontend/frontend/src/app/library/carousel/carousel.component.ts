
import { transition } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('trackContainer') trackContainer: ElementRef|undefined;
  @ViewChild('track') track: ElementRef|undefined;

  num_children: number = 0;
  current_slide: number = 0;
  constructor(private el:ElementRef) {

  }

  ngAfterViewInit(): void {
      setTimeout(() =>{
        if (this.track){
          this.num_children = this.track.nativeElement.children.length;
        }
      })
  }

  increase_progress(){
    this.current_slide += 1;
    if (this.trackContainer){
      this.trackContainer.nativeElement.style.transform = `translate(-${this.current_slide*100}%, 0)`;
    }
  }

  decrease_progress(){
    this.current_slide -= 1;
    if (this.trackContainer){
      this.trackContainer.nativeElement.style.transform = `translate(-${this.current_slide*100}%, 0)`;
    }
  }

  has_more_slides_right() {
    return this.current_slide < this.num_children-1;
  }

  has_more_slides_left() {
    return this.current_slide > 0;
  }

}
