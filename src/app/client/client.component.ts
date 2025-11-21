import { Component } from '@angular/core';
import { GenericCrudView } from '../components/generic-crud-view/generic-crud-view.component';
import { Client, ClientBaseDto, ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [GenericCrudView, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent extends AbstractCrudComponent<Client, ClientBaseDto> {

  constructor(private clientService: ClientService,
    toastService: ToastService) {
    super(clientService, toastService);
  }

  createEmptyForm(): ClientBaseDto {
    return {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    };
  }


}
