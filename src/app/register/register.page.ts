import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formData = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  register() {
    console.log('Sending registration data:', this.formData);
    this.authService.httppostcall('Register/registerUsersApp', this.formData).subscribe({
      next: (response: any) => {
        console.log('Registration response:', response);
        if (response.status === 'success') {
          this.presentRegistrationSuccessAlert();
        } else {
          this.presentRegistrationErrorAlert(response.message || 'Registration Error. Please enter correct values.');
        }
      },
      error: (error) => {
        console.error('Registration Error:', error);
        this.presentRegistrationErrorAlert('Error occurred during registration. Please try again later.');
      }
    });
  }

  async presentRegistrationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registration Successful',
      message: 'You have successfully registered.',
      buttons: ['OK']
    });

    await alert.present();
    alert.onDidDismiss().then(() => {
      this.router.navigate(['/']);
    });
  }

  async presentRegistrationErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registration Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}