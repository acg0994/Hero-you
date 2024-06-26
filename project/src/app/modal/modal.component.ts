import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { KeysPipe } from "../pipes/keys.pipe";

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    imports: [MatDialogModule, CommonModule, MatButton, KeysPipe]
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service: HeroService, public dialogRef: MatDialogRef<ModalComponent>,) {}

  cerrar(confirmacion: boolean) {
    this.dialogRef.close(confirmacion);
  }
}
