import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-angular";
import { Observable } from "rxjs";

export interface KpiOption {
  title: string;
  value: number;
  unit: string;
  icon: any;
  color: string;
  link: string;
}

export interface KpiData {
  totalClients: number;
  totalCommandes: number;
  totalLignesCommande: number;
  totalProduits: number;
  totalCategories: number;
  produitsAlerteStock: number;
  commandesEnCours: number;
}

@Injectable({  providedIn: 'root' })
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getKpiOptions(kpis: KpiData | null): KpiOption[] {
    return [
      {
        title: 'Produits',
        value: kpis?.totalProduits ?? 0,
        unit: 'Total Produits',
        icon: Package,
        color: 'bg-green-600',
        link: '/product'
      },
      {
        title: 'Produits en Alerte Stock',
        value: kpis?.produitsAlerteStock ?? 0,
        unit: 'Produits en Alerte Stock',
        icon: Package,
        color: 'bg-red-600',
        link: '/product'
      },
      {
        title: 'Clients',
        value: kpis?.totalClients ?? 0,
        unit: 'Total Clients',
        icon: Users,
        color: 'bg-blue-600',
        link: '/client'
      },
      {
        title: 'Commandes',
        value: kpis?.totalCommandes ?? 0,
        unit: 'Total Commandes',
        icon: ShoppingCart,
        color: 'bg-yellow-600',
        link: '/order'
      },
      {
        title: 'Ventes',
        value: kpis?.commandesEnCours ?? 0,
        unit: 'Commandes en cours',
        icon: TrendingUp,
        color: 'bg-purple-600',
        link: '/order-line'
      },
      {
        title: 'Catégories',
        value: kpis?.totalCategories ?? 0,
        unit: 'Total Catégories',
        icon: Package,
        color: 'bg-teal-600',
        link: '/category'
      }

    ];
  }

  getKpiData(): Observable<KpiData> {
    return this.httpClient.get<KpiData>('http://localhost:5251/api/Dashboard/kpis');
  }
}
