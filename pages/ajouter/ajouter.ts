import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ModalController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ajouter',
  templateUrl: 'ajouter.html'
})
export class AjouterPage {
  @ViewChild('fileInput') fileInput;
  options: any;
  
  settingsReady = false;
  cardItems: any[];
  isReadyToSave: boolean;

  notife: any;

  form: FormGroup;


  constructor(
    public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    private menuCtrl: MenuController,
    public camera: Camera) {
    this.form = formBuilder.group({
      profilePic: [''],
      quoi: ['', Validators.required],
      titre: ['', Validators.required],
      quand: ['', Validators.required],
      codePostal: ['', Validators.required, Validators.minLength(6)],
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

  ionViewDidLoad() {

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
    this.viewCtrl.dismiss();
    }

  done() {
    if (!this.form.valid) {  }
    this.viewCtrl.dismiss(this.form.value);
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }

}
