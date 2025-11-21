import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { GenericTableComponent } from '../generic-table/generic-table.component';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [NgTemplateOutlet, GenericTableComponent],
  templateUrl: './generic-crud-view.component.html',
  styleUrl: './generic-crud-view.component.css'
})
export class GenericCrudView {

  @Input() items: any[] = [];
  @Input() isLoading = false;
  @Input() form!: any;
  @Input() editMode = false;
  @Input() createMode = false;
  @Input({required: true}) header!: TemplateRef<any>;
  @Input({required: true}) row!: TemplateRef<any>;
  @Input({required: true}) formTemplate!: TemplateRef<any>;

  @Output() create = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
}
