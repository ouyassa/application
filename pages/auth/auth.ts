import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuController, NavParams, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexPage } from '../index/index';
import { TutorialPage } from '../tutorial/tutorial';
import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  title1: string;
  title2: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-auth',
  templateUrl: './auth.html'
})
export class AuthPage implements OnInit {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  mode: string;
  authForm: FormGroup;
  errorMessage: string;
  
  constructor(private authService: AuthService,
              private navParams: NavParams,
              translate: TranslateService, 
              private navCtrl: NavController,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              public platform: Platform) {
                this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE", "TUTORIAL_SLIDE1_TITLE1", "TUTORIAL_SLIDE1_TITLE2",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE", "TUTORIAL_SLIDE2_TITLE1", "TUTORIAL_SLIDE2_TITLE2",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE", "TUTORIAL_SLIDE3_TITLE1", "TUTORIAL_SLIDE3_TITLE2",
       "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            title1: values.TUTORIAL_SLIDE1_TITLE1,
            title2: values.TUTORIAL_SLIDE1_TITLE2, 
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            title1: values.TUTORIAL_SLIDE2_TITLE1,
            title2: values.TUTORIAL_SLIDE2_TITLE2,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            title1: values.TUTORIAL_SLIDE3_TITLE1,
            title2: values.TUTORIAL_SLIDE3_TITLE2,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });

              }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }
  onNew() {
    this.navCtrl.setRoot(AuthPage, {mode: 'new'});
    this.menuCtrl.close();
}
onConnect() {
  this.navCtrl.setRoot(AuthPage, {mode: 'connect'});
  this.menuCtrl.close();
}
  onToggleMenu() {
    this.menuCtrl.open();
  }
  startApp() {
    this.navCtrl.setRoot(IndexPage, {}, {
      animate: true,
      direction: 'auto'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new') {
      this.authService.createNewUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TutorialPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.connexionUser(email, password).then(
        () => {
          this.navCtrl.setRoot(IndexPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}