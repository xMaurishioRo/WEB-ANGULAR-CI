import { Component } from '@angular/core';
import { CommonModule, } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  //img = 'https://w3schools.com/howto/img_avatar.png';
  runrun = 'assets/images/chupo.jpeg'
  ranrun = 'assets/images/coche.avif'
}
