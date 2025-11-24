import { Component } from '@angular/core';
import { GenericCrudView } from '../components/generic-crud-view/generic-crud-view.component';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { Commande, CommandeCreateDto, CommandeService, CommandeUpdateDto } from '../../services/commande.service';
import { ToastService } from '../../services/toast.service';
import { Product, ProductService } from '../../services/products.service';
import { Client, ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [GenericCrudView, FormsModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})

export class CommandeComponent extends AbstractCrudComponent<Commande, CommandeCreateDto, CommandeUpdateDto> {

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

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? `${client.prenom} ${client.nom}` : 'Unknown Client';
  }

  loadProducts(){
    this.productService.getAll().subscribe((data)=>{
      this.products = data;
    });
  }
}
