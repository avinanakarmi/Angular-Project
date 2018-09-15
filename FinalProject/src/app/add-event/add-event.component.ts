import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private eventService: EventService) { }
  submitted: boolean ;
  showSuccessMessage: boolean;
  formControls = this.eventService.form.controls;

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    if (this.eventService.form.valid){
      //insert
      if (this.eventService.form.get('$key').value == null)
        this.eventService.insertEvent(this.eventService.form.value);
      //update
      else
        this.eventService.updateEvent(this.eventService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.eventService.form.reset();
    }
  }
}
