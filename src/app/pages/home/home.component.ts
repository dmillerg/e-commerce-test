import { Component, inject, OnInit } from '@angular/core';
import { MetaDataService } from '@app/core/services/meta-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly metadataService = inject(MetaDataService);
  ngOnInit(): void {
    this.metadataService.init('home')
  }
}
