import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeroService } from './hero.service';
import { Location } from '@angular/common';
import { LoaderAppService } from './loader-app.service';
import { LoaderAppComponent } from './loader-app/loader-app.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonModule,
    LoaderAppComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  public home: boolean = true;
  public loginError: boolean = false;

 
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public service: HeroService,
    private location: Location,
    public loader: LoaderAppService
  ) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.service.main = document.getElementById('main');
    }
    this.location.onUrlChange((url) => {
      if (this.service.main) {
        if (url === '/heroesEdit') {
          this.service.main.style.backgroundImage =
            'url("../assets/Images/Editar/Edita-desktop.png")';
          this.home = false;
        } else if (url === '/heroesList') {
          this.service.main.style.backgroundImage =
            'url("../assets/Images/Listar/List-desktop.png")';
          this.home = false;
        } else if (url === '/heroesCreate') {
          if (this.service.heroes.length === 4) {
            this.router.navigate(['']);
            this.home = true;
          } else {
            this.service.main.style.backgroundImage =
              'url("../assets/Images/Crear/Crea-desktop.png")';
            this.home = false;
          }
        } else {
          this.service.main.style.backgroundImage =
            'url("../assets/Images/Inicio/Inicio-desktop.png")';
          this.home = true;
        }
      }
    });
  }

  navigateToNext(option: string): void {
    const showLoader: boolean = option === '/heroesList';
    this.service.getDataHeroes(showLoader).subscribe((data) => {
      if (data.length === 0) {
        if (option === '/heroesEdit') {
          this.dialog.open(ModalComponent, {
            width: '350px',
            data: { info: 'No hay heroes para editar' },
          });
        } else if (option === '/heroesList') {
          this.dialog.open(ModalComponent, {
            width: '350px',
            data: { info: 'No hay heroes en la Guarida secreta' },
          });
        } else {
          this.router.navigate([option]);
        }
      } else if (data.length === 4) {
        if (option === '/heroesCreate') {
          this.dialog.open(ModalComponent, {
            width: '350px',
            data: { info: 'Has creado el maximo de heroes permitidos' },
          });
        } else {
          this.router.navigate([option]);
        }
      } else {
        this.router.navigate([option]);
      }
    });
  }

  navigateToHome(): void {
    if (this.service.heroes.length < 4) {
      this.location.back();
    } else {
      this.router.navigate(['']);
    }
  }

  logout(): void {
    const dialog: MatDialogRef<any> = this.dialog.open(ModalComponent, {
      width: '350px',
      data: {
        info: 'Esta seguro de cerrar la sesión?',
        buttons: true,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate([''])
        this.service.loginApp = true;
      }
    });
    
  }
}
