import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http : HttpClient) { }

  postSignUp(payload:any) {
    return this.http.post('http://localhost:3000/api/signup',payload)
  }
}
