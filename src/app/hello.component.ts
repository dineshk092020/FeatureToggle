import { Component, Input, OnInit } from '@angular/core';
import { LaunchdarklyService } from './launchdarkly.service';
import { ProjectsService } from './projects.service';
import { TimesService } from './times.service';

@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{name}}!</h1>
    <h4>Home</h4>
    <p *ngIf="featureCreateTimes">Create Time.</p>
    <p *ngIf="featureDeleteTimes">Delete Time.</p>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  // Feature Flags
  featureCreateTimes: boolean;
  featureDeleteTimes: boolean;
  // Feature
  flagSubscription: any;

  project: string = null;
  hours: number = null;
  description: string = null;
  errorMessage: string;
  times: any[] = [];
  projects: any[] = [];

  constructor(
    public timesService: TimesService,
    public projectsService: ProjectsService,
    launchDarklyService: LaunchdarklyService
  ) {
    // Subscribe to any changes to the feature flags
    this.flagSubscription = launchDarklyService.flagChange.subscribe(() =>
      this.initFlags(launchDarklyService)
    );
    // Get the initial state of the flags
    this.initFlags(launchDarklyService);
  }

  initFlags(launchDarklyService: LaunchdarklyService) {
    this.featureCreateTimes = launchDarklyService.getFlag('Times.create');
    this.featureDeleteTimes = launchDarklyService.getFlag('Times.delete');
  }
  /**
   * Get the times when the component is initialized
   */
  ngOnInit() {
    this.getTimes();
    this.getProjects();
  }
  /**
   * Get all of the Time Entries from the service
   */
  getTimes() {
    this.timesService
      .get()
      .subscribe(
        times => (this.times = times),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Saves a new Time Entry
   */
  addTime(): void {
    // NYI
  }

  /**
   * removes a time element
   */
  removeTime(time: any): void {
    // NYI
  }

  /**
   * Gets the list of projects from the Projects Service
   */
  getProjects(): void {
    this.projectsService
      .get()
      .subscribe(
        projects => (this.projects = projects),
        error => (this.errorMessage = <any>error)
      );
  }
}
