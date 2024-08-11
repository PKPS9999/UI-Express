import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder,private sharedService:SharedService) {}
  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  signup() {
    this.sharedService.postSignUp(this.signUpForm.value).subscribe({
      next: (response: any) => {
        console.log(response, "response");
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Token stored successfully:', token);
        } else {
          console.error('No token received in response');
        }
      },
      error: (err) => console.error('Signup Error:', err)
    });
  }
}
