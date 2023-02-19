import { Component } from '@angular/core';

@Component({
  selector: 'app-introduccion-directivas',
  templateUrl: './introduccion-directivas.component.html'
})
export class IntroduccionDirectivasComponent {
  message = "I'm read only!";
  canEdit = false;

  onEditClick() {
    this.canEdit = !this.canEdit;
    if (this.canEdit) {
      this.message = 'You can edit me!';
    } else {
      this.message = "I'm read only!";
    }
  }
}