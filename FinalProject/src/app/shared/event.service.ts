import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firebase: AngularFireDatabase) { }

  eventList: AngularFireList<any>;
  
  // CREATING FORM OBJECT
  form = new FormGroup(
    {
      $key: new FormControl(null), 
      date: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }
  );

  //FOR READ
  getEvents() {
    // RETRIEVE ALL EVENTS FRON DB
    this.eventList = this.firebase.list('events');
    //OBSERVABLE TO SEE RECORDS RETRIEVED
    return this.eventList.snapshotChanges();
  }

  //FROM INSERT INTO DB
  insertEvent(event) {
    this.eventList.push({
      date: event.date,
      name: event.name,
      description: event.description
    });
  }

  // EDIT EXISTING EVENT
  populateForm(event) {
    this.form.setValue(event);
  }

  //UPDATE EDITED VALUES IN DB
  updateEvent(event){
    this.eventList.update(event.$key,
      {
        date: event.date,
        name: event.name,
        description: event.description
      });
  }

  //DELETE EVENT
  deleteEvent($key: string) {
    this.eventList.remove($key);
  }
}
