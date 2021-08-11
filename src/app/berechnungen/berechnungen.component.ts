import { Component, OnInit } from "@angular/core";
import { Berechnungen } from "../berechnungen.model";

@Component({
  selector: "app-berchnungen",
  templateUrl: "./berechnungen.component.html",
  styleUrls: ["./berechnungen.component.css"],
})
export class BerechnungenComponent implements OnInit {
  berechnungen: Berechnungen[] = [];

  constructor() {}

  ngOnInit() {
    let allSavedData: any[] = JSON.parse(localStorage.getItem("allSavedData"));
    this.berechnungen = allSavedData ? allSavedData : [];
  }
}
