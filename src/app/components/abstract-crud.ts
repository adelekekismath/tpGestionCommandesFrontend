import { PenIcon, TrashIcon,PlusIcon } from "lucide-angular";
import { ToastService } from "../../services/toast.service";
import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { IBaseCrudService } from "../../services/crud/base-crud.interface";
import { extractErrorMessages } from "../../helper/extractErrorMessages";

@Injectable()
export abstract class AbstractCrudComponent<T,TCreatedto,TUpdatedto> implements OnInit {
  items:T[] = [];
  editing: boolean = false;
  form!: TCreatedto | TUpdatedto;
  editItemId: number | null = null;
  creating: boolean = false;
  isLoading: boolean = true;
  readonly PenIcon = PenIcon;
  readonly TrashIcon = TrashIcon;
  readonly PlusIcon = PlusIcon;

  constructor(protected service: IBaseCrudService<T,TCreatedto,TUpdatedto>,
    private toastService: ToastService
  ){}

  ngOnInit(){
    this.load();
    this.form = this.createEmptyForm();
  }

  abstract createEmptyForm(): TCreatedto;

  load(){
    this.service.getAll().subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  save(){
    if(this.editing && this.editItemId){
          this.service.update(this.editItemId,this.form as TUpdatedto).subscribe({
            next:(updateProduct)=>{
              var index = this.items.findIndex(p => (p as any).id === this.editItemId);
              if(index !== -1){
                this.items[index] = updateProduct;
                this.toastService.showSuccess(`Modification effectuée.`)
                this.reset();
                this.creating = false;
                this.editing = false;
                this.editItemId = null;
                return;
              }
            },
            error:(err)=>{
              this.toastService.showError(extractErrorMessages(err))
            }
          })
        }
        else{
          this.service.create(this.form as TCreatedto).subscribe({
            next:(createdItem)=>{
              if(!createdItem) return;
              var itemAlreadyExists = this.items.some(p => (p as any).id === (createdItem as any).id);
              if(itemAlreadyExists) {
                this.items = this.items.map(p => (p as any).id === (createdItem as any).id ? createdItem : p);
                this.toastService.showSuccess("Création effectuée (mise à jour de l'élément existant).");
                this.reset();
                this.creating = false;
                this.editing = false;
                return;
              }
              this.items.push(createdItem);

              this.toastService.showSuccess("Création effectuée.");
              this.reset();
            },
            error:(err)=>{
              this.toastService.showError(extractErrorMessages(err))
            }
          })
        }
  }

  delete(id:number){
    this.service.delete(id).subscribe({
      next:()=>{
        this.toastService.showSuccess(`La supression a bien été effectuée`);
        this.items = this.items.filter(p => (p as any).id !== id);
      },
      error:(err)=>{
        this.toastService.showError(extractErrorMessages(err))
      }
    })
  }

  startEdit(itemToUpdate: T){
    this.editItemId = (itemToUpdate as any).id;
    this.form  = {... itemToUpdate as any} as TUpdatedto;
    this.creating = false;
    this.editing = true;
  }

  startCreate(){
    this.form = this.createEmptyForm();
    this.editing = false;
    this.editItemId = null;
    this.creating = true;
  }

  cancelEdit(){
    this.reset();
    this.creating = false;
    this.editing = false;
  }

  reset() {
    this.form = this.createEmptyForm();
    this.editing = false;
    this.editItemId = null;
  }
}
