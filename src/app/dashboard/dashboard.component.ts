import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { DashboardService, KpiData, KpiOption } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

  kpis: KpiOption[] = [];



  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getKpiData().subscribe(data => {
      this.kpis = this.dashboardService.getKpiOptions(data);
    });
  }


  readonly Package = Package;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly TrendingUp = TrendingUp;

}
