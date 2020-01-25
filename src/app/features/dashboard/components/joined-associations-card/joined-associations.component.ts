import {Component, Input} from '@angular/core';
import {Association} from 'src/app/shared/models/associations/association.model';

@Component({
  selector: 'app-joined-associations-card',
  templateUrl: './joined-associations.component.html'
})
export class JoinedAssociationsCardComponent {
  @Input() public associations: Association[];
}
