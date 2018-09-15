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
  searchText: string = "";
  filterText: string = "";

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
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  filterCondition(event){
    return event.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !=-1;
  }

  filterDate(event){
    return event.date.indexOf(this.filterText) !=-1;
  }
}
