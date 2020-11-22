import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/banners";

  // get 获取商品列表，<Product[]> 表示后台返回一个数组，数组类型是 Product[];

  public getBanners() {
    return this.http.get(this.baseUrl);
  }

  // 以上所有的返回都是一个对象，Observable
}






