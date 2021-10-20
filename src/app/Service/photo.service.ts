import { Photo } from './../Models/photo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photos = new Photo('../../../assets/image/logo.png', 1);
  constructor(private http: HttpClient ) {
   }

  getPhoto(id: number): Observable<Photo>{
    return this.http.get<Photo>('http://localhost:3000/api/user/photo/find/' + id);
  }

  getImageFromUrl(url: string): any{
    let response;
    response = 'http://localhost:3000/api/images/' + url; // 5PJRFQj1fCmMlZNfzf2XSFAp.png
    return response;
  }
}
