import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnedAssociationsComponent } from './containers/owned-associations/owned-associations.component';
import { OwnedAssociationComponent } from './containers/owned-association/owned-association.component';


const routes: Routes = [
  { path: '', component: OwnedAssociationsComponent },
  { path: ':id', component: OwnedAssociationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnedAssociationsRoutingModule { }
