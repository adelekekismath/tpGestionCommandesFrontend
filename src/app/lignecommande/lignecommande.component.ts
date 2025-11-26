import { Component } from '@angular/core';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { Lignecommande, LignecommandeCreateDto, LignecommandeService } from '../../services/lignecommande.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { GenericCrudView } from '../components/generic-crud-view/generic-crud-view.component';
import { Product, ProductService } from '../../services/products.service';
import { Commande, CommandeService } from '../../services/commande.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lignecommande',
  standalone: true,
  imports: [GenericCrudView, FormsModule,DatePipe],
  templateUrl: './lignecommande.component.html',
  styleUrl: './lignecommande.component.css'
})
export class LignecommandeComponent extends AbstractCrudComponent<Lignecommande, LignecommandeCreateDto, LignecommandeCreateDto> {
  products: Product [] = [];
  commandes: Commande [] = [];
  currentCommandeId: number | null = null;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadProducts();
    this.loadCommandes();
  }

  constructor(lignecommandeService: LignecommandeService,
    private productService: ProductService,
    private commandeService: CommandeService,
    toastService: ToastService) {
    super(lignecommandeService, toastService);
  }

  createEmptyForm(): LignecommandeCreateDto {
    return {
      commandeId: 0,
      produitId: 0,
      quantite: 0,
    };
  }

  startCreateForCommande(commandeId: number){
    console.log("Starting create for commandeId:", commandeId);
    super.startCreate();
    this.form.commandeId = commandeId;
    this.currentCommandeId = commandeId;
  }

  loadProducts(){
    this.productService.getAll().subscribe((data)=>{
      this.products = data;
    });
  }

  get linesByCommande() {
    return this.commandes.map(c => ({
      commande: c,
      lignes: this.items.filter(l => l.commandeId === c.id)
    }));
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.nom : 'Unknown Product';
  }

  loadCommandes(){
    this.commandeService.getAll().subscribe((data)=>{
      this.commandes = data;
    });
  }
}
