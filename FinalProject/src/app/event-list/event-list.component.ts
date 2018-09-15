import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventService) { }

  eventArray = [];
  showDeletedMessage:boolean;

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      list => {
        this.eventArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.eventService.deleteEvent($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 30000);
    }
  }

}
