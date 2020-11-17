import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from './../../alert/alert.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public registerErrors: string;

  myData : any = {};

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initLoginForm();
    this.initRegisterForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  private initRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  // public onRegister() {
  //   if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
  //     this.registerErrors = 'Passwords don\'t match!';
  //     this.registerForm.controls.password.setErrors({ password: true });
  //     this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
  //   } else {
  //     this.authenticationService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password)
  //       .then(
  //         () => {
  //           this.messageService.add('Account created successfully. Please login with your new credentials!');
  //           this.loginForm.setValue({ email: this.registerForm.value.email, password: '' });
  //           this.initRegisterForm();
  //         },
  //         (error) => {
  //           this.registerErrors = error.message;
  //           if (error.code === 'auth/weak-password') {
  //             this.registerForm.controls.password.setErrors({ password: true });
  //             this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
  //           }
  //           if (error.code === 'auth/email-already-in-use') {
  //             this.registerForm.controls.email.setErrors({ email: true });
  //           }
  //         }
  //       );
  //   }
  // }

  // 注册: register
  public onRegister() {
    if (this.registerForm.valid) {

      const obj = {

        username: this.registerForm.controls.username.value,
        password: this.registerForm.controls.password.value,
        email: this.registerForm.controls.email.value,

      };

      this.authService.register(obj).subscribe(data => {

        this.myData = data;
        if ( this.myData.code == '0' ) {

          this.messageService.add('Account created successfully. Please login with your new credentials!');
          this.loginForm.setValue({ username: this.registerForm.value.username, password: '' });
          this.initRegisterForm();
          // this.alertService.success('注册成功！正在跳转...');
        }
        else {
          this.alertService.error(this.myData.msg);
        }
      });



    }
  }

  // public onLogin() {
  //   this.authenticationService.emailLogin(this.loginForm.value.email, this.loginForm.value.password)
  //     .then(() => {
  //       this.messageService.add('Login successful!');
  //       this.router.navigate(['/home']);
  //     },
  //       (error) => {
  //         if (error.code === 'auth/user-not-found') {
  //           this.loginForm.controls.email.setErrors({ email: true });
  //         }
  //         if (error.code === 'auth/wrong-password') {
  //           this.loginForm.controls.password.setErrors({ password: true });
  //         }
  //       }
  //     )
  // }

  // 登录： Login
  public onLogin() {
    const obj = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.authService.login(obj).subscribe(data => {

      if (data['code'] == '0') {  // 登录成功

        this.messageService.add('Login successful!');
        this.router.navigate(['/home']);
      }

      else {
        this.alertService.error(data['msg']);
      }
    });
  }

}
