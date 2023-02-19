import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urlImagen = 'https://us.123rf.com/450wm/blueringmedia/blueringmedia1407/blueringmedia140700264/30260690-ilustraci%C3%B3n-de-una-condici%C3%B3n-de-clima-soleado-sobre-un-fondo-blanco.jpg';

  ciudad = '';
  tempetura = 0;
  humedad = 0;
  clima = '';
  query = false;
  loading = false;
  mostrarError = false;

  constructor(private _climaService: ClimaService) { }

  ngOnInit(): void {
  }

  obtenerClima() {
    this.query = false;
    this.loading = true;

    this._climaService.getClima(this.ciudad).subscribe(data => {
      this.loading = false;
      this.query = true;
      this.tempetura = data.main.temp - 273
      this.humedad = data.main.humidity
      this.clima = data.weather[0].main
    }, error => {
      console.log(error);
      this.loading = false;
      this.error();
    })
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = '';
    }, 3000);
  }



}