import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  @Input() public items: any[];
  public currentSlide: number;
  public imagesLoaded: string[];

  public options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: false,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    }
  };

  constructor(private ngxSiemaService: NgxSiemaService) {}

  ngOnInit() {
    this.currentSlide = 0;
    this.imagesLoaded = [];

    // 构建轮播数据

    // this.items = [
    //   {
    //     _id: "1",
    //     name: "1 product",
    //     imageFeatruedUrl: "http://qjolkfg1d.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201112194009.jpg?e=1605185169&token=jyobYzX9elcdfpXh8w-dzFXIw0iGxFYXYnIuZn5b:4Wbp68MwFuhBm0mvTsAf9btUEDQ="
    //   },
    //   {
    //     _id: "2",
    //     name: "2 product",
    //     imageFeatruedUrl: "http://qjolkfg1d.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201112194049.jpg?e=1605185169&token=jyobYzX9elcdfpXh8w-dzFXIw0iGxFYXYnIuZn5b:V_F2eKu0pulqoTQ8VO6bb4GaZts="
    //   },
    //   {
    //     _id: "3",
    //     name: "3 product",
    //     imageFeatruedUrl: "http://qjolkfg1d.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201112194055.jpg?e=1605185169&token=jyobYzX9elcdfpXh8w-dzFXIw0iGxFYXYnIuZn5b:n8B1lytRK9Bgt-4l2GMYIDhAGr4="
    //   }
    // ];
    // console.log('local banner data:' , this.items);
    
  }

  public prev() {
    if (this.currentSlide > 0) {
      this.ngxSiemaService
        .prev(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  public next() {
    if (this.currentSlide < this.items.length - 1) {
      this.ngxSiemaService
        .next(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  public goTo(index: number) {
    this.ngxSiemaService
      .goTo(index)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.currentSlide = data.currentSlide;
      });
  }

  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
