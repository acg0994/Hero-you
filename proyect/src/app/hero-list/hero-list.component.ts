import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {
  ngOnInit(): void {
    console.log('siii')
  }
}
