import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from '../../services/dashboard.facade';
import { AssociationCreated } from '../../../../shared/events/association-created.event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public ownedAssociations$ = this.dashboardFacade.ownedAssociations$;
  public joinedAssociations$ = this.dashboardFacade.joinedAssociations$;

  public constructor(private dashboardFacade: DashboardFacade) { }

  public ngOnInit(): void {
    this.dashboardFacade.loadDashboard();
  }

  public createAssociation($event: AssociationCreated): void {
    this.dashboardFacade.createAssociation($event);
  }
}
