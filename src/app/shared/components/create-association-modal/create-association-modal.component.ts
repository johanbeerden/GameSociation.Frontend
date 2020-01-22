import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssociationCreated } from '../../events/association-created.event';

@Component({
  selector: 'app-create-association-modal',
  templateUrl: './create-association-modal.component.html'
})
export class CreateAssociationModalComponent {
  @Input() public opened = false;
  @Output() public closed = new EventEmitter<boolean>();
  @Output() public associationCreated = new EventEmitter<AssociationCreated>();

  public form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  public create(): void {
    const name = this.form.get('name').value;
    const event = new AssociationCreated(name);
    this.associationCreated.emit(event);
  }

  public close(): void {
    this.closed.emit(true);
  }
}
