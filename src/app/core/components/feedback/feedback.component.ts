import { Component, OnInit } from '@angular/core';
import { faFan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hmo-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  faSpinner = faFan;
  iframeLoading = true;
  constructor() { }

  ngOnInit(): void {
  }
}
