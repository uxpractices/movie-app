import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FeaturePageComponent } from './pages/feature-page/feature-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found.page.component';

const routes: Routes = [
  { path: '', redirectTo: '/featured/Avengers', pathMatch: 'full' },
  { path: 'search', component: SearchPageComponent },
  { path: 'home/:title', component: SearchPageComponent },
  { path: 'featured', component: FeaturePageComponent },
  { path: 'featured/:title', component: FeaturePageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
