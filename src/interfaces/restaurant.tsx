export interface Restaurant {
    id: number,
    name: string,
    description?: string,
    quartier: string,
    prix: string,
    drapeau: string,
    image: string,
    stars: number,
    instagram?: string,
    website?: string,
    phone?: string,
    reviews?: number,
    isHomePage?: boolean,
    adress: string
}