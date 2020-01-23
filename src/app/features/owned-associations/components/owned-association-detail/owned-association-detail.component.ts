import { Component, Input } from '@angular/core';
import { Association } from 'src/app/shared/models/associations/association.model';

@Component({
  selector: 'app-owned-association-detail',
  templateUrl: './owned-association-detail.component.html'
})
export class OwnedAssociationDetailComponent {
  @Input() public association: Association;
}
