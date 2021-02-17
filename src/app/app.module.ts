import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { BlogList } from './homepage/homepage.component';
import { ProductList } from './explore/explore.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomepageComponent } from './homepage/homepage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FilterPipe } from './blogfilter.pipe';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductComponent } from './product/product.component';
import { MatIconModule } from '@angular/material/icon';
import { ExploreComponent } from './explore/explore.component';
import { BlogsComponent } from './blogs/blogs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectProduct } from './blogs/blogs.component';
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomepageComponent,
    BlogList,
    FilterPipe,
    ProductComponent,
    ExploreComponent,
    ProductList,
    BlogsComponent,
    SelectProduct,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
