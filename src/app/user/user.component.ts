import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Array<any> = [];
  isLoading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/allUser').subscribe((res: any) => {
      this.users = res.users;
      this.isLoading = false;
      console.log(this.users);

    });
  }
  onVerify(id:any) {
    this.http.put('http://localhost:3000/api/admin/allUser' + id, {}).subscribe(res => {
      console.log(res);
    });
  }
}
