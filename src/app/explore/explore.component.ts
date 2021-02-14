import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  products: Array<any> = [];
  blogs: Array<any> = [];
  trending: Array<any> = [];
  explore: any;
  trendingProduct: Array<any> = [];
  selectIndex: number = 0;
  isLoaded = false;
  trendingBlog: Array<any> = [];
  BlogTrending: Array<any> = [];
  ExclusiveBlog: Array<any> = [];
  blogExclusive: Array<any> = [];
  selectedType: number = 0;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/productInfo').subscribe((res: any) => {
      this.products = res.blog;

      console.log(this.products);

    });
    this.http.get('http://localhost:3000/api/admin/explore').subscribe((res: any) => {
      this.explore = res;
      if (this.explore.products !== undefined) {
        this.trendingProduct = this.explore.product;
      }
      if (this.explore.trending !== undefined) {
        this.trendingBlog = this.explore.trending;
      }
      if (this.explore.exclusive) {
        this.ExclusiveBlog = this.explore.exclusive;
      }
      console.log(this.trendingProduct);
      this.isLoaded = true;


    });
    this.http.get('http://localhost:3000/api/admin/allBlog').subscribe((res: any) => {
      console.log("blog", res);
      this.BlogTrending = res;

  });
  }
  openDialog(i: number, j:number): void {
    this.selectIndex = i;
    this.selectedType = j;
    if (j === 1) {
      const dialogRef = this.dialog.open(ProductList, {
        width: '90%',
        data: { blog: this.BlogTrending, selectedType: this.selectedType }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          if (this.trendingBlog[this.selectIndex - 1] !== undefined  || this.trendingBlog.length) {
            this.trendingBlog[this.selectIndex - 1] = result;
          } else {
            this.trendingBlog.push(result);
           }
          console.log(this.trendingBlog);
        }

      });
    }
    if (j === 0) {
      const dialogRef = this.dialog.open(ProductList, {
        width: '90%',
        data: { blog: this.products , selectedType: this.selectedType }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          if (this.trendingProduct[this.selectIndex - 1] !== undefined  || this.trendingProduct.length) {
            this.trendingProduct[this.selectIndex - 1] = result;
          } else {
            this.trendingProduct.push(result);
           }
          console.log(this.trendingProduct);
        }

      });
    }
    if (j === 2) {
      const dialogRef = this.dialog.open(ProductList, {
        width: '90%',
        data: { blog: this.BlogTrending, selectedType: this.selectedType }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          if (this.ExclusiveBlog[this.selectIndex - 1] !== undefined  || this.ExclusiveBlog.length) {
            this.ExclusiveBlog[this.selectIndex - 1] = result;
          } else {
            this.ExclusiveBlog.push(result);
           }
          console.log(this.ExclusiveBlog);
        }

      });
    }
  }

}
@Component({
  selector: 'product-list',
  templateUrl: 'productlist.html',
})
export class ProductList implements OnInit {
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<ProductList>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    filterData: any;
  selectProduct: any;
    ngOnInit(): void {

    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onBlogSelect(blog: any) {
      this.selectProduct = blog;
    }
  }
