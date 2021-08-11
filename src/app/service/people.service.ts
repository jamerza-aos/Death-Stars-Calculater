import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Planet } from "../planet.model";

@Injectable({
  providedIn: "root",
})
export class PeopleService {
  constructor(private httpClient: HttpClient) {}
  getPeople(value: any): Observable<any> {
    return this.httpClient
      .get(`https://swapi.dev/api/people/?search=${value}`)
      .pipe(map((Allpeople: any) => Allpeople.results));
  }

  getDiameter(url_of_the_planet: string): Promise<number> {
    return this.httpClient
      .get(url_of_the_planet)
      .pipe(
        map((planet: Planet) => {
          debugger;
          if (isNaN(planet.diameter as any)) {
            return 0;
          } else {
            return Number(planet.diameter);
          }
        })
      )
      .toPromise();
  }
}
