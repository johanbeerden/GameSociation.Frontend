import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociationsComponent } from './containers/associations/associations.component';
import { AssociationComponent } from './containers/association/association.component';


const routes: Routes = [
  { path: '', component: AssociationsComponent },
  { path: ':id', component: AssociationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationsRoutingModule { }
