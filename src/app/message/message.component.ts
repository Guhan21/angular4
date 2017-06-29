import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = this.route.snapshot.data['message'];
  }

}
