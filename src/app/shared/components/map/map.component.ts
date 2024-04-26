import { Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl : 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit{
  constructor(private san : DomSanitizer){}
  ngOnInit(): void {
    // const safeEmbedLink = this.san.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=');
    // const newEmbedLink = safeEmbedLink + '';
  }
  @Input({ required: true }) embedLinkA: string = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1702829.7498542645!2d75.26496015!3d33.5315621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1698944363500!5m2!1sen!2sin';
  domSanitizer = inject(DomSanitizer);
}
