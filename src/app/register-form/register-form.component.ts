import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  public invalidade_first: boolean = false;
  public invalidade_last: boolean = false;
  public invalidade_email: boolean = false;
  public incorreto_email: boolean = false;
  public invalidade_pass: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createform();
  }

  onSubmit() {
    // Iria usar event emmiter se fosse usar o formvalue em outro canto
    console.log(this.registerForm);
    this.invalidade_first = false;
    this.invalidade_last = false;
    this.invalidade_email = false;
    this.invalidade_pass = false;
    if (this.firstName?.invalid) {
      this.invalidade_first = true;
    }
    if (this.lastName?.invalid) {
      this.invalidade_last = true;
    }
    // @ts-ignore
    if (this.registerForm.controls['email'].errors['email']) {
      this.incorreto_email = true;
    } else if (this.email?.invalid) {
      this.invalidade_email = true;
    }
    if (this.password?.invalid) {
      this.invalidade_pass = true;
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  createform() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
      },
      {
        validators: [],
      }
    );
  }
}
