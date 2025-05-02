export class Images {
    id_espace: number;
    images: string; // URL ou chemin de l'image

    constructor(id_espace: number, images: string) {
        this.id_espace = id_espace;
        this.images = images;
    }
}
