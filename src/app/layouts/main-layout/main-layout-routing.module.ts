import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from '../../features/feed/feed.component';
import { HomeComponent } from '../../home/home.component';

export const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
