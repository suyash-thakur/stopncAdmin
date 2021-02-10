import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  userNum: any = 0;
  blogNum: any = 0;
  productNum: any = 0;


  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/countUser').subscribe((res) => {
      console.log(res);
      this.userNum = res;
    });
    this.http.get('http://localhost:3000/api/admin/blogCount').subscribe((res) => {
      console.log(res);
      this.blogNum = res;
    });
    this.http.get('http://localhost:3000/api/admin/productCount').subscribe((res) => {
      console.log(res);
      this.productNum = res;
    });
  }
  navigate(num: number): void {
    if (num === 1) {
      this.router.navigate(['/homepage']);
    }
  }
}
