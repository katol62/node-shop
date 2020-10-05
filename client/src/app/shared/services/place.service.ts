import { Injectable } from '@angular/core';
import * as data from '../../places.json';

export interface IPlace {
    name: string;
    streets: string[];
}

@Injectable({
    providedIn: 'root'
})
export class PlaceService {

    private places: IPlace[] = (data as any).default.cities;

    constructor() {
    }

    public getCities(): string[] {
        return this.places.map(item => item.name);
    }

    public getStreets(city: string): string[] {
        return this.places.find( place => place.name === city)['streets'];
    }

    public cities(): Promise<any> {
        return new Promise((resolve) => {
            const cities = this.places.map(item => item.name);
            resolve(cities);
        })
    }

    public strrets(city: string): Promise<any> {
        return new Promise((resolve) => {
            const streets = this.places.find( place => place.name === city)['streets'];;
            resolve(streets);
        })
    }

}
