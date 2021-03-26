import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  selectIndex: number = 0;

  constructor(private http: HttpClient, public dialog: MatDialog) { }
  blogs: Array<any> = [];
  products: Array<any> = [];
  blogProducts: Array<Array<any>> = [];

  isloaded = false;
  prodLoaded = false;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/unverifiedBlog').subscribe((res: any) => {
      this.blogs = res;
      console.log("blog", this.blogs);
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].products !== undefined) {
          this.blogProducts.push(this.blogs[i].products);
        } else {
          this.blogProducts.push([]);
        }
      }
      console.log(this.blogProducts);
      this.isloaded = true;

    });
    this.http.get('http://localhost:3000/api/admin/productInfo').subscribe((res: any) => {
      this.products = res.blog;
      this.prodLoaded = true;
      console.log(this.products);

    });
  }
  verifyBlog(id: any, index: number) {
    var blogId = [];
    for (let y = 0; y < this.blogProducts[index].length; y++) {
      blogId.push(this.blogProducts[index][y]._id);
    }
    const product = {
      product: blogId
    };
    this.http.put('http://localhost:3000/api/admin/verify' + id, product).subscribe((res: any) => {
      console.log(res);
    });
  }

  openDialog(i: number): void {
    this.selectIndex = i;
    const dialogRef = this.dialog.open(SelectProduct, {
      width: '90%',
      data: {blog: this.products}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.blogProducts[this.selectIndex].push(result);

    });
  }
}

@Component({
  selector: 'select-product',
  templateUrl: 'selectproduct.html',
})
export class SelectProduct implements OnInit {
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<SelectProduct>,
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
