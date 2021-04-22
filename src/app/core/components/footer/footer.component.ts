import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { VERSION_TOKEN } from '../../../version.provider';
import { ModalService } from '../../../ui-kit/components/modal/simple-modal.component';

@Component({
  selector: 'hmo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string;
  faHearth = faHeart;

  constructor(
    @Inject(VERSION_TOKEN) version: string,
    private modalService: ModalService
  ) {
    this.version = version;
  }

  ngOnInit(): void {
  }

  openFeedback(feedbackTemplate: TemplateRef<{}>): void {
    this.modalService.open({
        template: feedbackTemplate
      },
      h => console.log('gotHandler', h)
    );
  }
}
