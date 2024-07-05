import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.httpcall('Dashboard/displayUsersApp').subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.users = response.data;
        } else {
          this.presentAlert('Error', response.message || 'Failed to load users.');
        }
      },
      error: (error: any) => {
        console.error('Users Error:', error);
        this.presentAlert('Error', 'Failed to load users. Please try again later.');
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