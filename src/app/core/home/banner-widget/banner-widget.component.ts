import { Component, Input } from '@angular/core';

// import { Product } from '../../../models/product.model';
import { Banner } from '../../../models/banner.model';

@Component({
  selector: 'app-banner-widget',
  templateUrl: './banner-widget.component.html',
  styleUrls: ['./banner-widget.component.scss']
})
// export class ProductWidgetComponent {
export class BannerWidgetComponent {
  // @Input() public products: Product[];
  @Input() public banners: Banner[];
  @Input() public widgetTitle: string;
}
