import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheckIcon, XIcon, InfoIcon, LucideAngularModule } from 'lucide-angular';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  duration?: number;
  currentIcon: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();

  toast$ = this.toastSubject.asObservable();
  readonly CheckIcon = CheckIcon;
  readonly XIcon =XIcon;
  readonly InfoIcon= InfoIcon;

  constructor() { }

  showSuccess(message: string, duration: number = 3000) {
    this.toastSubject.next({ message, type: 'success', duration, currentIcon: this.CheckIcon });
  }

  showError(message: string, duration: number = 50000) {
    this.toastSubject.next({ message, type: 'error', duration, currentIcon: this.XIcon });
  }

  showInfo(message: string, duration: number = 3000) {
    this.toastSubject.next({ message, type: 'info', duration, currentIcon: this.InfoIcon });
  }
}
