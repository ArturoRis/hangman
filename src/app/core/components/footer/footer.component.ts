import { Component, Inject, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { VERSION_TOKEN } from '../../../version.provider';

@Component({
  selector: 'hmo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string;
  faHearth = faHeart;

  constructor(
    @Inject(VERSION_TOKEN) version: string
  ) {
    this.version = version;
  }

  ngOnInit(): void {
  }

}
