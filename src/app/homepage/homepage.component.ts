import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }
  homedata: any = [];
  isLoading = true;
  blog1: any;
  blog2: any;
  blog3:Array<any>  = [];
  allBlogs: any;
  selectIndex: number = 1;


  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/homepageInfo').subscribe((res:any) => {
      console.log(res);
      this.homedata = res.home;
      if (this.homedata !== undefined && this.homedata.FirstBlog !== undefined  && this.homedata.SecondBlog !== undefined && this.homedata.TopStories.length !== 0) {
        this.blog1 = this.homedata.FirstBlog;
        this.blog2 = this.homedata.SecondBlog;
        this.blog3 = this.homedata.TopStories;


      }
      this.isLoading = false;
    });
    this.http.get('http://localhost:3000/api/admin/allBlog').subscribe((res: any) => {
      console.log(res);
      this.allBlogs = res;

  });
  }
  saveData() {
    const blog = {
      blog1: this.blog1,
      blog2: this.blog2,
      topStories: this.blog3
    }
    this.http.post('http://localhost:3000/api/admin/homepageInfo', blog).subscribe((res: any) => {
      console.log(res);
    })
  }
  openDialog(i: number): void {
    this.selectIndex = i;
    const dialogRef = this.dialog.open(BlogList, {
      width: '90%',
      data: {blog: this.allBlogs}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (this.selectIndex === 1) {
        this.blog1 = result;
      } else if (this.selectIndex === 2) {
        this.blog2 = result;

      }else if (this.selectIndex === 3) {
        this.blog3.push(result);
        console.log(this.blog3);

      }
    });
  }
}
@Component({
  selector: 'blog-list',
  templateUrl: 'bloglist.html',
})
export class BlogList implements OnInit {
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,  public dialogRef: MatDialogRef<BlogList>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  filterData: any;
  selectblog: any;

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onBlogSelect(blog: any) {
    this.selectblog = blog;
  }
}
