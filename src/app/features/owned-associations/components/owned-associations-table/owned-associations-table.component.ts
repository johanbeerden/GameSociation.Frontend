import {Component, Input} from '@angular/core';
import {Association} from 'src/app/shared/models/associations/association.model';

@Component({
  selector: 'app-owned-associations-table',
  templateUrl: './owned-associations-table.component.html'
})
export class OwnedAssociationsTableComponent {
  @Input() public associations: Association[];
}
