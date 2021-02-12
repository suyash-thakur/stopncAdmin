import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Array<any> = [];
  newBlog: {
    name: String,
    link: String,
    description: String
  } = {name: '', link: '',  description: '' };
  blogImage = [];
  imgObj: any;
  public imagesUrl:Array<any> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/productInfo').subscribe((res: any) => {
      console.log(res);
      this.product = res.blog;
    });
  }
  onSelectFile(event:any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const FILE = event.target.files[0];
      this.imgObj = FILE;
      this.onImageUpload();

    }
}
onImageUpload() {
  const imageForm = new FormData();
  console.log('clicked 2');

  imageForm.append('image', this.imgObj);
  this.http.post('http://localhost:3000/api/admin/uploadProductImage', imageForm).subscribe((val: any) => {
    let link = val.image;
    this.imagesUrl.push(link);
    console.log(link);
  });

}
  saveProduct() {
    const prod = {
      name: this.newBlog.name,
      link: this.newBlog.link,
      description: this.newBlog.description,
      image: this.imagesUrl
    };
    this.http.post('http://localhost:3000/api/admin/createProduct', prod).subscribe((val: any) => {
      console.log(val);
      this.product.push(val.product);
    });
  }
  deleteProduct(id:any) {
    this.http.post('http://localhost:3000/api/admin/deleteProduct' + id, {}).subscribe((val: any) => {
      console.log(val);
      this.product.pop();
    });
  }
}
