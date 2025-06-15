import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-landing-page",
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: "./landing-page.html",
  styleUrls: ["./landing-page.css"],
})
export class LandingPage {
}
