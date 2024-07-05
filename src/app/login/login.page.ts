import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.httppostcall('Login/checkLoginApp', loginData).subscribe({
      next: (response: any) => {
        if (response.response === 'success') {
          this.router.navigate(['/tabs/tab3']); 
        } else {
          this.presentAlert('Invalid credentials. Please try again.');
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.presentAlert('Error occurred during login. Please try again later.');
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
