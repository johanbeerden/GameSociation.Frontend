import {NgModule} from '@angular/core';
import {AssociationsRoutingModule} from './associations-routing.module';
import {AssociationsComponent} from './containers/associations/associations.component';
import {AssociationsFacade} from './services/associations.facade';
import {AssociationsState} from './store/associations.state';
import {NgxsModule} from '@ngxs/store';
import {AssociationsTableComponent} from './components/associations-table/associations-table.component';
import {SharedModule} from '../../shared/shared.module';
import {AssociationComponent} from './containers/association/association.component';
import {AssociationDetailComponent} from './components/association-detail/association-detail.component';
import {InviteToAssociationModalComponent} from './components/invite-to-association-modal/invite-to-association-modal.component';
import { LeaveAssociationModalComponent } from './components/leave-association-modal/leave-association-modal.component';

const states = [
  AssociationsState
];

@NgModule({
  declarations: [
    AssociationsComponent,
    AssociationsTableComponent,
    AssociationComponent,
    AssociationDetailComponent,
    InviteToAssociationModalComponent,
    LeaveAssociationModalComponent
  ],
  imports: [
    AssociationsRoutingModule,
    NgxsModule.forFeature(states),
    SharedModule
  ],
  providers: [
    AssociationsFacade
  ]
})
export class AssociationsModule { }
