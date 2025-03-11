import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: false
})
export class DetailsComponent implements OnInit {


  espace: any = null;
  selectedImage: SafeUrl | null = null;
  latitude = 36.8065;
  longitude = 10.1815;
  mapsURL: SafeResourceUrl = '';
  images: SafeUrl[] = [];
  groupedEspaces: { [key: string]: any } = {};

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEspaceDetails(id);
  }
  loadEspaceDetails(id: number): void {
    this.searchService.getEspaceById(id).subscribe(
      (espace) => {
        console.log('Données reçues:', this.espace); // Ajoutez ce log
        this.espace = espace;
        if (this.espace) {
          console.log('Images:', this.espace.imageData); // Vérifiez les données
          this.mapsURL = this.generateMapsURL();
          this.processImages();
          this.groupEspacesByType();
        }
      },
      (error) => {
        console.error('Erreur API:', error);
      }
    );
  }// Corriger la propriété idEspace → id (selon votre modèle de données)



  private processImages(): void {
    this.images = [];
    // Ajouter l'image principale du CoWorkspace
    if (this.espace.imageData) {
      this.selectedImage = this.getImageUrl(this.espace.imageData);
      this.images.push(this.selectedImage);
    }
    // Ajouter les images des Espaces
    if (this.espace.espaces) {
      this.espace.espaces.forEach((espace: any) => {
        if (espace.imageData) {
          this.images.push(this.getImageUrl(espace.imageData));
        }
      });
    }
  }



  // Corrigez la méthode getImageUrl
private getImageUrl(imageData: any): SafeUrl {
  if (!imageData) return '';
  // Si imageData est déjà un string Base64
  if (typeof imageData === 'string') {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${imageData}`);
  }
  // Si c'est un ArrayBuffer
  try {
    const base64 = this.arrayBufferToBase64(imageData);
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${base64}`);
  } catch (error) {
    console.error('Erreur de conversion image', error);
    return '';
  }
}
  private arrayBufferToBase64(buffer: any): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  groupEspacesByType(): void {
    this.groupedEspaces = {};
    if (this.espace?.espaces) {
      this.espace.espaces.forEach((espace: any) => {
        const type = espace.type;
        if (!this.groupedEspaces[type]) {
          this.groupedEspaces[type] = {
            count: 1,
            capacite: espace.capacite,
            prix: espace.prixParMois,
            idEspace: espace.idEspace,
            description:espace.description,
            image: this.getImageUrl(espace.imageData)
          };
        } else {
          this.groupedEspaces[type].count += 1;
        }
      });
    }
  }

  getGroupedEspaceKeys(): string[] {
    return Object.keys(this.groupedEspaces);
  }

// Mettre à jour la méthode generateMapsURL()
// Mettre à jour la méthode generateMapsURL()
generateMapsURL(): SafeResourceUrl {
  if (!this.espace?.adresse || !this.espace?.ville) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  const API_KEY = 'AIzaSyDlIGAQssWqp8q0Xum6nNzKfEvQvKJyrRE'; 
  const query = encodeURIComponent(`${this.espace.adresse}, ${this.espace.ville},${this.espace.nom}`);
  const url = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${query}&zoom=16`;

  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  getOptionIcon(option: string): string {
    const icons: { [key: string]: string } = {
      'Wi-Fi haut débit': '📶',
      'Prises électriques multiples': '🔌',
      'Écran de projection': '📽️',
      'Télévision ou écran connecté': '📺',
      'Vidéoconférence': '🎥',
      'Imprimante et scanner': '🖨️',
    };
    return icons[option.trim()] || '✔️';
  }

  getEspaceDisponibleKeys(): string[] {
    return Object.keys(this.espace?.espace_disponible || {});
  }
}