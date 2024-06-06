import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesDetailComponent } from './rides/components/ridesDetail/ridesDetail.component';
import { RideComponent } from './rides/ride.component';

const routes: Routes = [
  { path: '', redirectTo: 'rides', pathMatch: 'full' },
  { path: 'rides', component: RideComponent },
  { path: 'detail/:id', component: RidesDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
