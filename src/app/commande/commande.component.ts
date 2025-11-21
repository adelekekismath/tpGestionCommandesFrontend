import { Component } from '@angular/core';
import { GenericCrudView } from '../components/generic-crud-view/generic-crud-view.component';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { Commande, CommandeBaseDto, CommandeService } from '../../services/commande.service';
import { ToastService } from '../../services/toast.service';
import { Product, ProductService } from '../../services/products.service';
import { Client, ClientService } from '../../services/client.service';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [GenericCrudView],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})

export class CommandeComponent extends AbstractCrudComponent<Commande, CommandeBaseDto> {

  products: Product [] = [];
  clients: Client [] = [];

  constructor(private commandeService: CommandeService,
    private productService: ProductService,
    private clientService: ClientService,
    toastService: ToastService) {
    super(commandeService, toastService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadClients();
    this.loadProducts();
  }

  createEmptyForm() {
    return {
      clientId: 0,
      statut: '',
      montantTotal: 0
    };
  }

  loadClients(){
    this.clientService.getAll().subscribe((data)=>{
      this.clients = data;
    });
  }

  loadProducts(){
    this.productService.getAll().subscribe((data)=>{
      this.products = data;
    });
  }
}
