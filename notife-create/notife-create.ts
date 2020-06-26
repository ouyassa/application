import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, MenuController, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { NotifesService } from '../../services/notifes.service';
import { ListNotifePage } from '../list-notife/list-notife';
import { NotifeSauvegarde } from '../../models/interface-notife';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-notife-create',
  templateUrl: 'notife-create.html'
})
export class NotifeCreatePage  {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  sauvegardeNotife : NotifeSauvegarde[];

  notife: any[];
  email:string;
  showDetails: boolean = false;

  form: FormGroup;

  infoPras: any[];
  quois: any[];

  constructor( 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public notifesService: NotifesService,
    private menuCtrl: MenuController,
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public formBuilder: FormBuilder, 
    public camera: Camera,
    public storage: Storage) {

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.email = user.email;
          } else {
            console.log(user.email)
          }
        }
      );

    this.form = formBuilder.group({
      profilePic: [''],
      quoi: ['', Validators.required],
      titre: ['', Validators.required],
      quand: ['', Validators.required],
      codePostal: ['', Validators.required],
      commune: ['', Validators.required],
      infoPra: [''],
      adresse: [''],
      email: [''],
      horaire: [''],
      infosSupp: [''],
      nameContact: ['', Validators.required],
      emailContact: ['', Validators.required],
      statusContact: ['', Validators.required],
      statusNotife: ['', Validators.required],
     
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }
  ngOnInit() {
    this.infoPras = this.notifesService.infoPras;
    this.quois = this.notifesService.quois;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad createPage');
    this.storage.get('Pref')
    .then((data : NotifeSauvegarde[]) =>{
      this.sauvegardeNotife = data;
    })
    .catch(err =>{
      console.log("erreur", err);
    }) 
  }
  infoDetails() {
    this.showDetails = !this.showDetails;
 }
 


  dismissModal() : void {
    this.viewCtrl.dismiss()  
    }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cancel() {
    this.form.reset();
   }
   
   done(form: FormBuilder) {
    if (!this.form.valid) {  }
    console.log (this.form.value);
    this.notifesService.addNotife(this.form.value);
    this.navCtrl.push(ListNotifePage);
    this.form.reset();
    this.onSaveList();
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }
  onValider() {
    let alert = this.alertCtrl.create({
      title: 'Merci',
      subTitle: 'Nous mettons tout en oeuvre,pour valider votre annonce',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => this.done(this.formBuilder)
        }
      ]
    });
    alert.present();
  }
  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    this.notifesService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }
  
}
