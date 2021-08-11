import { Component, OnInit } from "@angular/core";
import { Subject, of } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
import { SelectedPeople, People } from "../People.model";
import { PeopleService } from "../service/people.service";
import { Berechnungen } from "../berechnungen.model";

@Component({
  selector: "app-new-berechnung",
  templateUrl: "./new-berechnung.component.html",
  styleUrls: ["./new-berechnung.component.css"],
})
export class NewBerechnungComponent implements OnInit {
  private subjectKeyUp = new Subject<any>();
  people$: any;
  value: any;
  selectedPeople: SelectedPeople[] = [];
  // isFetching = true;
  totalDiameters: number = 0;
  tempValue: any;

  constructor(private peoplService: PeopleService, private router: Router) {}

  ngOnInit(): void {
    this.subjectKeyUp
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((d) => {
        this.getPeople(d);
      });
  }
  onSearch($event: any) {
    const value = $event.target.value;
    if (value.length > 1) {
      this.subjectKeyUp.next(value);
    }
  }
  getPeople(value: string) {
    this.people$ = this.peoplService.getPeople(value);
  }

  // Get selected person data (mit diameter)
  async selectPerson(person: People) {
    // leer search list
    this.tempValue = null;
    this.people$ = of([]);

    let diameter = await this.peoplService.getDiameter(person.homeworld);

    this.selectedPeople.push({
      name: person.name,
      homeworld: person.homeworld,
      diameter: diameter,
    } as SelectedPeople);
  }

  // Berchnungen Total Diameters
  calc() {
    this.totalDiameters = this.calcIt();
  }

  private calcIt(): number {
    if (this.selectedPeople.length > 0) {
      let selectedPeopleWithoutDuplicate: SelectedPeople[] =
        this.selectedPeople.reduce((unique, o) => {
          if (!unique.some((obj) => obj.homeworld === o.homeworld)) {
            unique.push(o);
          }
          return unique;
        }, []);

      return this.sum(selectedPeopleWithoutDuplicate, "diameter");
    } else {
      console.log("ein gegner wählen!");
      return 0;
    }
  }

  private sum(arr: any[], key: string): number {
    return arr.reduce((a, b) => a + (b[key] || 0), 0);
  }
  // schick data nach erste Seite
  apply() {
    if (this.selectedPeople && this.selectedPeople.length > 0) {
      let allSavedData: any[] = JSON.parse(
        localStorage.getItem("allSavedData")
      );

      let allNames = this.selectedPeople
        .map((person) => {
          return person.name;
        })
        .join(",");

      if (!allSavedData) allSavedData = [];

      allSavedData.push({
        name: allNames,
        total: this.calcIt(),
      } as Berechnungen);

      localStorage.setItem("allSavedData", JSON.stringify(allSavedData));
    }
    this.router.navigate(["/"]);
  }
}
