import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent  implements OnInit {
  // @ts-ignore
  @Input("selectedId") selectedId : string;
  @Input("mainColor") mainColor : string = "#EDEDED";
  @Input("backColor") backColor : string = "#2ED08B";
  @Input("textColor") textColor : string = "#12122C";
  @Input("percent") percent : number = 0;
  @Input("fontSize") fontSize : number =  16;
  @Input("fontWeight") fontWeight : number =  600;
  @Input("letterSpacing") letterSpacing : number = -0.906;
  // @ts-ignore
  chart
  constructor() { 
  }

  ngAfterViewInit() {
    this.initChart()
  }
  ngOnChanges() {
    this.destroyChart()
    this.initChart()
  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    
  }

  ngOnDestroy() {
    
    this.destroyChart();
  }


  
  initChart() {
    
    var chartProgress = document.getElementById(`${this.selectedId}`) as ChartItem;
  
    // @ts-ignore
    
    
    
    if (chartProgress) {
      
      const backgroundColorCircle = {
        id: this.selectedId,
        // @ts-ignore
        beforeDatasetsDraw(chart, args, option) {
          const { ctx } = chart
          
          ctx.save()
          let x = chart.getDatasetMeta(0).data[0].x       
          let y = chart.getDatasetMeta(0).data[0].y       
          let innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
          let outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
          let angle = Math.PI / 180
          ctx.beginPath()
          ctx.lineWidth = outerRadius - innerRadius
          
          ctx.strokeStyle = option.color
          ctx.arc(x, y, outerRadius - (outerRadius - innerRadius) / 2, 0, angle * 360, false)
          ctx.stroke()
        },
        defaults: {
          color: this.backColor
        }
      }
  
      const data = {
  
        datasets: [{
          data: [this.percent, 100 - this.percent],
          backgroundColor: [
            this.mainColor,
            'transparent',
          ],
          background: '#d1d1d1',
          hoverOffset: 0,
          spacing: 0,
          // spacing: 10,
          offset: 0,
          // borderStyle: "round"
          width: 10,
          // dashOffset: 0,
          borderWidth: 0,
          borderStyle: "round",
          hoverRadius: 50,
          borderRadius: 20,
          // background: "red"
  
        }]
      };
      this.chart = new Chart(this.selectedId, {
        type: 'doughnut',
        data: data,
        plugins: [
          {
            id: this.selectedId,
            beforeDraw: (chart, args, option) => {
              var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              ctx.restore();
              // @ts-ignore
              ctx.font = `${option?.fontWeight} ${option?.fontSize}px sans-serif`;
              // @ts-ignore
              ctx.letterSpacing = option?.letterSpacing + "px";
              // @ts-ignore
              ctx.fillStyle = option?.textColor;
              ctx.textBaseline = "middle";
              var text = chart.data.datasets[0].data[0] + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
  
              ctx.fillText(text, textX, textY);
              ctx.save();
            },
            defaults: {
              textColor: this.textColor,
              fontSize: this.fontSize,
              fontWeight: this.fontWeight,
              letterSpacing: this.letterSpacing
            }
          },
          backgroundColorCircle
        ],
        options: {
          cutout: 58.5,
          responsive: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          hover: {
            // @ts-ignore
            mode: null // Set hover mode to null to disable tooltips
          },
          tooltips: {
            enabled: false // Disable tooltips
          },
          showTooltips: false
        }
      })
      
    }

    
  }

  destroyChart() {
    
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }


}
