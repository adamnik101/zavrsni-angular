import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {RegisterData} from "../interfaces/register-data";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _authService: AuthService,
              private _snackbar: SnackbarService) {
  }
  registerGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('')
  }, {
    validators: [matchPasswordValidator('password', 'confirmPassword')]
  });

  resetForm() {
    this.registerGroup.reset()
  }
  register() {
    if(this.registerGroup.valid) {
      let registerData: RegisterData = {
        username: this.registerGroup.get('username')?.value!,
        email: this.registerGroup.get('email')?.value!,
        password: this.registerGroup.get('password')?.value!,
        confirmPassword: this.registerGroup.get('password')?.value!,
      }
      this._authService.register(registerData).subscribe({
        next: (response: any) => {
          this._snackbar.showDefaultMessage(response.message)
        },
        error: (err) => {
          this._snackbar.showFailedMessage(err.error.message)
        }
      })
    }
  }

  protected readonly Validators = Validators;
}


export function matchPasswordValidator(controlName: string, matchingControlname: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pw = formGroup.get(controlName)
    const pwConfirm = formGroup.get(matchingControlname)

    if(!pw || !pwConfirm) {
      return null
    }

    if(pw!.value !== pwConfirm!.value) {
      pwConfirm.setErrors({passwordMismatch: true})
      return { passwordMismatch: true}
    }
    pwConfirm.setErrors(null)
    return null
  }
}
