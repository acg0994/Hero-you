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
import { KeysPipe } from "./pipes/keys.pipe";
import { keys } from './keys/keys';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        CommonModule,
        MatButtonModule,
        LoaderAppComponent,
        LoginComponent,
        KeysPipe
    ]
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

  // Metodo que controla los fondos de pantalla según la ruta
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.service.main = document.getElementById('main');
    }
    this.location.onUrlChange((url) => {
      if (this.service.main) {
        if (url === keys['heroesEditRoute']) {
          this.service.main.style.backgroundImage =
            'url("../assets/Images/Editar/Edita-desktop.png")';
          this.home = false;
        } else if (url === keys['heroesListRoute']) {
          this.service.main.style.backgroundImage =
            'url("../assets/Images/Listar/List-desktop.png")';
          this.home = false;
        } else if (url === keys['heroesCreateRoute']) {
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

  // Lógica de navegaciones desde la página principal
  navigateToNext(option: string): void {
    const showLoader: boolean = option === keys['heroesListRoute'];
    this.service.getDataHeroes(showLoader).subscribe((data) => {
      if (data.length === 0) {
        if (option === keys['heroesEditRoute']) {
          this.dialog.open(ModalComponent, {
            width: keys['modalWidth'],
            data: { info: keys['noHeroesToEdit'] },
          });
        } else if (option === keys['heroesListRoute']) {
          this.dialog.open(ModalComponent, {
            width: keys['modalWidth'],
            data: { info: keys['noHeroesToEdit'] },
          });
        } else {
          this.router.navigate([option]);
        }
      } else if (data.length === 4) {
        if (option === keys['heroesCreateRoute']) {
          this.dialog.open(ModalComponent, {
            width: keys['modalWidth'],
            data: { info: keys['maxHeroes'] },
          });
        } else {
          this.router.navigate([option]);
        }
      } else {
        this.router.navigate([option]);
      }
    });
  }

  // Lógica para navegar hacia a atras, o la página principal
  navigateToHome(): void {
    if (this.service.heroes.length < 4) {
      this.location.back();
    } else {
      this.router.navigate(['']);
    }
  }

  // Modal de cerrar sesión
  logout(): void {
    const dialog: MatDialogRef<any> = this.dialog.open(ModalComponent, {
      width: keys['modalWidth'],
      data: {
        info: keys['closeSesion'],
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
