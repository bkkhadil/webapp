import { Component } from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: false,
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent {
  images = [
    { src: 'assets/images/espace-a.png', alt: 'Formation' },
    { src: 'assets/images/espace-b.png', alt: 'Espace de coworking' },
    { src: 'assets/images/espace-h.png', alt: 'Salle de réunion' },
    { src: 'assets/images/espace-a.png', alt: 'Atelier en groupe' },
    { src: 'assets/images/espace-h.png', alt: 'Discussion' },
    { src: 'assets/images/espace-a.png', alt: 'Atelier en groupe' },
    { src: 'assets/images/espace-h.png', alt: 'Atelier en groupe' },
  ];

}
