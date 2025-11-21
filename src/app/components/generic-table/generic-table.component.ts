import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, PlusIcon, PenIcon, TrashIcon } from 'lucide-angular';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent {

  readonly PenIcon = PenIcon;
  readonly TrashIcon = TrashIcon

  PlusIcon = PlusIcon;

  @Input() items: any[] = [];

  @Input({ required: true }) headerTemplate!: TemplateRef<any>;

  @Input({ required: true }) rowTemplate!: TemplateRef<any>;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
  @Output() create = new EventEmitter<void>();

  get colspanCount(): number {
    return 5;
  }

}
