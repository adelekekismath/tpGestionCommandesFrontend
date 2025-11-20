import { PenIcon, TrashIcon,PlusIcon } from "lucide-angular";
import { ToastService } from "../../services/toast.service";
import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { IBaseCrudService } from "../../services/crud/base-crud.interface";
import { extractErrorMessages } from "../../helper/extractErrorMessages";

@Injectable()
export abstract class AbstractCrudComponent<T,Tdto> implements OnInit {
  items:T[] = [];
  editing: boolean = false;
  form!: Tdto;
  editItemId: number | null = null;
  creating: boolean = false;
  abstract createEmptyForm(): Tdto;
  isLoading: boolean = true;
  readonly PenIcon = PenIcon;
  readonly TrashIcon = TrashIcon;
  readonly PlusIcon = PlusIcon;

  constructor(protected service: IBaseCrudService<T,Tdto>,
    private toastService: ToastService
  ){}

  ngOnInit(){
    this.load();
    this.form = this.createEmptyForm();
  }

  load(){
    this.service.getAll().subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  save(){
    if(this.editing && this.editItemId){
          this.service.update(this.editItemId,this.form).subscribe({
            next:(updateProduct)=>{
              var index = this.items.findIndex(p => (p as any).id === this.editItemId);
              if(index !== -1){
                this.items[index] = updateProduct;
                this.toastService.showSuccess(`Modification effectuée.`)
                this.reset();
              }
            },
            error:(err)=>{
              this.toastService.showError(extractErrorMessages(err))
            }
          })
        }
        else{
          this.service.create(this.form).subscribe({
            next:(createdProduct)=>{
              this.items.push(createdProduct);
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

  edit(itemToUpdate: T){
    this.editItemId = (itemToUpdate as any).id;
    this.form = {... itemToUpdate as any};
    console.log("this.form",this.form);
    this.editing = true;
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
