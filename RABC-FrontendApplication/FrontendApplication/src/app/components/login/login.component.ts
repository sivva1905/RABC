import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  submitted: boolean = false;
  role: string = '';
  constructor(private formBuilder: FormBuilder, private user: LoginService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Email regex pattern
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Password regex pattern
        ]
      ],

    });

  }

  get Role(): boolean {
    return this.role === 'user';
  }
  submit() {
    if (this.form.invalid) {
      this.submitted = true
      return;
    }
    const login: login = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    console.log(login);

    this.user.login(login).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token.token);
        localStorage.setItem('role', res.token.role)
        if (res) {
      
          this.route.navigate(['/home']);
          this.toastr.success('Login Successfully', '', {
            timeOut: 3000, // 3 seconds timeout
            closeButton: true, // Optional: Add a close button
          });
        }
      },
      error: (err) => {
        console.log('error');
        this.toastr.error('Login Failed', '', {
          timeOut: 3000, // 3 seconds timeou
          closeButton: true, // Optional: Add a close button
        });
      }
    })
  }
}
