import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.css']
})
export class ContactDetail {
  @Input() contact?: Contact;

  onEdit() {
    console.log('Edit clicked', this.contact);
  }

  onDelete() {
    console.log('Delete clicked', this.contact);
  }

}