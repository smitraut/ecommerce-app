import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: any[] = [];

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.authService.httpcall('Products/displayProductsApp').subscribe({
      next: (response: any) => {
        console.log('Full response:', response);
        if (response.status === 'success') {
          this.products = response.data;
        } else {
          this.presentAlert('Error', response.message || 'Failed to load products.');
        }
      },
      error: (error: any) => {
        console.error('Full error:', error);
        this.presentAlert('Error', 'Failed to load products. Please try again later.');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
