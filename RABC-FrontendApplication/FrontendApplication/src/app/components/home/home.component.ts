import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { registartion } from 'src/app/models/registration';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form!: FormGroup;
  users: any;
  role: string = '';
  loading: boolean = true;
  submitted: boolean = false;
  modalRef!: BsModalRef;
  constructor(private user: LoginService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
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
      name: [
        '',
        [
          Validators.required,
        ]
      ],
      role: ['user', [Validators.required]]
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUsers();

  }

  get isUserRole():boolean{
    return this.role==='user';
  }
  getAllUsers() {
    this.loading = true;
    this.user.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data.data;
        this.loading = false
        console.log(this.users);

      },
      error: (err) => {
        console.log(err)
        this.loading = true;
      },

    })
  }
  openAdduserDialog(addUserDialog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addUserDialog);
  }
  UpdateUserDialog(UpdateUserTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(UpdateUserTemplate);
  }
  loadUser(user: any) {
    console.log(user);
    this.form.patchValue({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role
    })

  }

  deleteUser(user: any) {
    console.log(user);
const email=user;
    this.user.deleteUser(email).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllUsers();
        this.toastr.success('User Deleted Successfully', '', {
          timeOut: 3000, // 3 seconds timeout
          closeButton: true, // Optional: Add a close button
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('User Deleted Failed', '', {
          timeOut: 3000, // 3 seconds timeout
          closeButton: true, // Optional: Add a close button
        });
      }
    })
  }

  closeAdduserDialog() {
    this.modalRef.hide();
  }
  UpdateUser() {
    const register: registartion = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value,
      name: this.form.get('name')?.value
    }
    this.user.updateUser(register).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllUsers();
        this.modalRef.hide();
        this.toastr.success('User Updated Successfully', '', {
          timeOut: 3000, // 3 seconds timeout
          progressBar: true, // Optional: Add a progress bar
          closeButton: true, // Optional: Add a close button
        });

      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('User Updated Failed', '', {
          timeOut: 3000, // 3 seconds timeout
          closeButton: true, // Optional: Add a close button
        });
      }

    })
  }
  addUser() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    const register: registartion = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value,
      name: this.form.get('name')?.value
    }
    this.user.register(register).subscribe({
      next: (res: any) => {
        console.log(res);

        this.getAllUsers();
        this.modalRef.hide();
      },
      error: (err) => {
        this.loading = true;
      }
    })
  }
}
