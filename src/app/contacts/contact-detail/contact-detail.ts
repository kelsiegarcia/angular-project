import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.css']
})
export class ContactDetail {
contact: Contact | undefined;

constructor( 
  private contactService: ContactService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    const id = params['id'];
    this.contact = this.contactService.getContact(id);
  });
}
  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete(): void {
    if (!this.contact) return;
    
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
