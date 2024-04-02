import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HeroService } from '../hero.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { KeysPipe } from "../pipes/keys.pipe";
import { keys } from '../keys/keys';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        KeysPipe
    ]
})
export class LoginComponent {
  public loginError: boolean = false;
  public isRegister: boolean = false;
  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, public service: HeroService, public dialog: MatDialog,) {}

  // Método que loga o crea al usuario en funcion de la variable de registro del servicio
  onSubmit(): void {
    if (!this.isRegister) {
      this.service.user = this.loginForm.value.email
      this.service.login().subscribe((data) => {
        if (data) {
          this.service.loginApp = false;
          this.loginError = false;
        } else {
          this.service.loginApp = true;
          this.loginError = true;
        }
      });
    } else {
      this.service.registerUser().subscribe((data) => {
        this.dialog.open(ModalComponent, {
          width: keys['modalWidth'],
          data: { info: data },
        });
        localStorage.setItem('isLoggedIn', this.loginForm.value.email);
        this.isRegister = false;
      });
    }
  }

  // Método que te lleva al formulario de registro
  register(): void {
    this.isRegister = true;
  }
}
