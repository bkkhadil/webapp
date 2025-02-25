import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: false,
})
export class DetailsComponent implements OnInit {
  espace: any = null;
  selectedImage: string | null = null;
  latitude = 36.8065;
  longitude = 10.1815;
  mapsURL: SafeResourceUrl = '';

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
    this.searchService.search('', '', '').subscribe((results) => {
      this.espace = results.find((item) => item.id === id);
      if (this.espace) {
        this.latitude = this.espace.latitude || this.latitude;
        this.longitude = this.espace.longitude || this.longitude;
        this.mapsURL = this.generateMapsURL();
      }
    });
  }

  generateMapsURL(): SafeResourceUrl {
    const address = `${this.espace.localisation} ${this.espace.nom} ${this.espace.ville}`;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=20&ie=UTF8&iwloc=&output=embed`;
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

  changeImage(image: string): void {
    this.selectedImage = image;
  }

  getEspaceDisponibleKeys(): string[] {
    return Object.keys(this.espace?.espace_disponible || {});
  }
}