import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  protected message: string='';
  protected contactWhatsapp (){
    return `https://wa.me/5354600851?text=${encodeURIComponent(this.message)}`
  } 
}
