import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost/codeigniter/ecommerce-web/';

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  httpcall(url: string): Observable<any> {
    const fullUrl = this.baseUrl + url;
    const separator = fullUrl.includes('?') ? '&' : '?';
    const requestUrl = fullUrl + separator + 'randomvalue=' + Math.random();
    
    console.log('Request URL:', requestUrl);

    return this.http.get(requestUrl)
        .pipe(
        );
}
  httppostcall(url: string, data: any): Observable<any> {
    console.log('Request URL:', this.baseUrl + url);
    console.log('Request Data:', data);
     
    return this.http.post(this.baseUrl + url, data, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          console.log('Raw response:', response);
          return JSON.parse(response);
        }),
      );
  }
  
 
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
}