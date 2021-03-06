import { Component, OnInit } from '@angular/core';
import {Zone} from '../../../model/zone';
import {GenericService} from '../../../services/generic/generic.service';
import {HelperMethodsService} from '../../../services/generic/helper-methods.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zone-page',
  templateUrl: './zone-page.component.html',
  styleUrls: ['./zone-page.component.css']
})
export class ZonePageComponent implements OnInit {
  elemsPerRow: number = 4;
  zones: Zone[] = [];
  zonesView: Zone[][] = [];

  constructor(private genericService: GenericService,
              private helperMethodService: HelperMethodsService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.genericService.getAll<Zone>('/zone/all/0').subscribe(zones => {
      this.zones = zones;
      this.updateZonesView();
    });
  }

  delete(zoneId: number) {
    const index: number = this.zones.findIndex(x => x.id === zoneId);
    const zone: Zone = this.zones[index];
    this.genericService.delete('/zone', zone.id).subscribe(() => {
      this.zones.splice(index, 1);
      this.updateZonesView();
      this.toastr.success('Zone successfully deleted');
      }, error => {
              console.log(JSON.stringify(error));
              this.toastr.error(error.error.error);
    });
  }

  transportTypeChanged(event: any) {
    const type: number = event.target.value;
    this.genericService.getAll<Zone>(`/zone/all/${type}`).subscribe(zones => {
      this.zones = zones;
      this.updateZonesView();
    });
  }

  updateZonesView() {
    this.zonesView = this.helperMethodService.getListOfLists<Zone>(this.elemsPerRow, this.zones);
  }

}
