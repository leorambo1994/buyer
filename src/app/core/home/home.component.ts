import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MessageService } from '../../messages/message.service';
import { ProductService } from '../../products/shared/product.service';
import { BannerService } from './main-slider/banner.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';
import { PromoService } from '../shared/promo.service';

import { Product } from '../../models/product.model';
import { Promo } from '../../models/promo.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public bannersFeatured: any;
  public products: Product[];
  public productsNewArrivals: Product[];
  public productsOnSale: Product[];
  public productsBestRated: Product[];
  public promos: Promo[];

  constructor(
    private messageService: MessageService,
    private productsCache: ProductsCacheService,
    private bannerService: BannerService,
    private productService: ProductService,
    private promoService: PromoService
  ) { }

  ngOnInit() {
    // 获取商品的数据
    this.productService
      .getProducts()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = <Product[]>products;
        console.log('products data:', this.products);
      });

    // 获取首页轮播图的数据
    this.bannerService
      .getBanners()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (banners) => {
          this.bannersFeatured = banners;
          console.log('banners data:', this.bannersFeatured);
        },
        (err) => console.error(err)
      );

    // this.productService
    //   .getProductsByDate(3)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     (products) => {
    //       this.productsNewArrivals = products;
    //     },
    //     (err) => console.error(err)
    //   );

    // this.productService
    //   .getProductsByRating(3)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     (products) => {
    //       this.productsBestRated = products;
    //     },
    //     (err) => console.error(err)
    //   );

    // this.productService
    //   .getProductsQuery('sale', true, 3)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     (products) => {
    //       this.productsOnSale = products;
    //     },
    //     (err) => console.error(err)
    //   );

    this.promoService
      .getPromos()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promos) => {
        this.promos = promos;
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

