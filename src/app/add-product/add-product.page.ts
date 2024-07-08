import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';
  productImage: File | null = null;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.productImage) {
      this.presentAlert('Please select a product image.');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', this.productName);
    formData.append('product_price', this.productPrice.toString());
    formData.append('product_description', this.productDescription);
    formData.append('product_image', this.productImage, this.productImage.name);

    this.authService.httppostcall('AddProduct/addProductApp', formData).subscribe({
      next: (response: any) => {
        console.log('Add Product response:', response);
        if (response.status === 'success') {
          this.presentSuccessAlert('Product added successfully');
          this.router.navigate(['/tabs/tab2']); 
        } else {
          this.presentAlert(response.message || 'Failed to add product');
        }
      },
      error: (error) => {
        console.error('Add Product Error:', error);
        this.presentAlert('Error occurred while adding the product. Please try again later.');
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productImage = file;
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    alert.onDidDismiss().then(() => {
      this.router.navigate(['/tabs/tab2']); 
    });
  }
}