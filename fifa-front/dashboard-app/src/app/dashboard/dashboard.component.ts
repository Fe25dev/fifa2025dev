
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';
//import { DashboardRoutingModule } from './dashboard-routing.module';  

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { ChartOptions, ChartType, ChartDataset } from 'chart.js';  
import { ChartData, ChartConfiguration } from 'chart.js'; 

import { Chart } from 'chart.js/auto';


// import { AppRoutingModule } from './app-routing.module'; 

@Component({
  selector: 'app-dashboard',
  //standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  title = 'Habilidades del Jugador';
  playerId: string = '';  // Almacena el ID ingresado por el usuario
  player: any = null;  // Almacena los datos del jugador
  errorMessage: string = '';  // Mensaje de error en caso de que no se encuentre el jugador

  public chart: any;
constructor(private apiService: ApiService) {}

ngOnInit(): void {

  }
  createChart(playerName: string, playerData: number[]) {

    this.chart = new Chart("MyChart", {
      type: 'radar', // continua

      data: {
        labels: ['Shooting', 'Passing', 'Dribbling', 'Potential', 'value_eur'],
        datasets: [
          {
            // label: "Player 1",
            // data: [8, 9, 7, 6, 5], // Datos para Player 1
            label: "", 
            data: playerData, 
            backgroundColor: 'rgba(0, 210, 255, 0.3)', // Azul claro vibrante
            borderColor: 'deepskyblue', // Nombre de color CSS
            borderWidth: 2
          }
        ]
      },
      options: {
        plugins: {
        legend: {
            display: false // Esto oculta la leyenda por completo
        },
        title: {
            display: false // Esto asegura que el título no se muestre
        }
        },
        scales: {
          r: {
            pointLabels: {
                      color: 'black' //color de los labels de los puntos
                  },
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 5
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    });
  }


  // Método para buscar jugador
  searchPlayer() {

    if (this.playerId && +this.playerId >= 0) {
      this.apiService.getPlayer(this.playerId).subscribe(
        (data: any) => {
          if (data) {
            this.player = data;
            this.errorMessage = '';
            console.log('Datos obtenidos:', data);
            this.updateChartData(data);
          } else {
            this.errorMessage = 'Jugador no encontrado';
            this.player = null;
          }
        },
        (error) => {
          console.error('Error al obtener los datos del jugador:', error);
          this.errorMessage = 'Hubo un error al obtener los datos. Intenta de nuevo más tarde.';
          this.player = null;
        }
      );
    } else {
      this.errorMessage = 'Por favor ingrese un ID de jugador valido';
    }
  }

  updateChartData(playerData: any) {
    if (this.chart) {
      this.chart.destroy(); // Destruir el gráfico existente si existe
    }
    const playerName = playerData.long_name; 
    const playerStats = [
      playerData.shooting,
      playerData.passing,
      playerData.dribbling,
      playerData.potential,
      playerData.overall
    ];
    this.createChart(playerName, playerStats);
  }

}

