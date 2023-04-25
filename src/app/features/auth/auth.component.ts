import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  isPorfileset: boolean = false;
  constructor(private authService: AuthService,
    private acrud: ACrudService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {


      this.authService.SignIn(email, password)
        .then(d => {
          this.isLoading = false
          this.authService.userData.subscribe((x:any) => {

            if (x.user.emailVerified) {
              this.getProfileByUid(x.user.uid)
            }
          })

        })
        .catch(e => {
          this.isLoading = false
          this.error = e.message
        })

    } else {

      this.authService.SignUp(email, password).then(d => {

        this.isLoading = false
        this.authService.SignOut()
      })
        .catch(e => {
          this.authService.SignOut()
          this.isLoading = false
          this.error = e
        })

    }


    form.reset();
  }


  tryGoogleLogin() {
    this.isLoading = true
    this.authService.GoogleAuth()
      .then((res: User) => {

        this.isLoading = false
        this.getProfileByUid(res.uid)

      })
  }


  getProfileByUid(uid: string) {

    this.acrud.getProfileFromUid(uid).subscribe((data: any) => {

      let x = this.acrud.seprate(data)
      this.isPorfileset = x[0];

      this.isLoading = false

      if (this.isPorfileset) {
        this.router.navigate(['']);
      }
      else {

        this.router.navigate(['myprofile'])
      }

    })
}
