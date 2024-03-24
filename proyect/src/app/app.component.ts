import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroService } from './hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  public home: boolean = true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public service: HeroService,
    private location: Location
  ) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.service.main = document.getElementById('main');
    }
    this.location.onUrlChange((url) => {
      console.log(url);
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
          if(this.service.heroes.length === 4){
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
    if (this.service.heroes.length === 0) {
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
    } else if (this.service.heroes.length === 4) {
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
  }

  navigateToHome() {
    if (this.service.heroes.length < 4) {
      this.location.back();
    } else {
      this.router.navigate(['']);
    }
  }
}
