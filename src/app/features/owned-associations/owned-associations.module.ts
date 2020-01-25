import {NgModule} from '@angular/core';
import {OwnedAssociationsRoutingModule} from './owned-associations-routing.module';
import {OwnedAssociationsComponent} from './containers/owned-associations/owned-associations.component';
import {OwnedAssociationsFacade} from './services/owned-associations.facade';
import {OwnedAssociationsState} from './store/owned-associations.state';
import {NgxsModule} from '@ngxs/store';
import {OwnedAssociationsTableComponent} from './components/owned-associations-table/owned-associations-table.component';
import {SharedModule} from '../../shared/shared.module';
import {OwnedAssociationComponent} from './containers/owned-association/owned-association.component';
import {OwnedAssociationDetailComponent} from './components/owned-association-detail/owned-association-detail.component';
import {InviteToAssociationModalComponent} from './components/invite-to-association-modal/invite-to-association-modal.component';

const states = [
  OwnedAssociationsState
];

@NgModule({
  declarations: [
    OwnedAssociationsComponent,
    OwnedAssociationsTableComponent,
    OwnedAssociationComponent,
    OwnedAssociationDetailComponent,
    InviteToAssociationModalComponent
  ],
  imports: [
    OwnedAssociationsRoutingModule,
    NgxsModule.forFeature(states),
    SharedModule
  ],
  providers: [
    OwnedAssociationsFacade
  ]
})
export class OwnedAssociationsModule { }
