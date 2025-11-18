import { Component } from '@angular/core';
import { Toast, ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { LucideAngularModule, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [LucideAngularModule],
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  currentToast: Toast | null = null;
  currentIcon: string = '';
  readonly XIcon = XIcon;
  private toastSubscription: Subscription = new Subscription();
  private timeoutId: any;


  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.toast$.subscribe(toast => {
      this.showToast(toast);
    });
  }

  showToast(toast: Toast) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.currentToast = toast;

    this.timeoutId = setTimeout(() => {
      this.hideToast();
    }, toast.duration);
  }

  hideToast() {
    this.currentToast = null;
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
