import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FeedComponent } from '../../features/feed/feed.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feed', component: FeedComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
