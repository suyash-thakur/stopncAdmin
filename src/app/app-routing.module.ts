import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'product', component: ProductComponent },
  {path: 'explore', component: ExploreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
