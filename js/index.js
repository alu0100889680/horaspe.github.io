var presentacion = new Vue ({
	el: "#head",
	data: {
		titulo: "Contador de prácticas\n",
		subtitulo: "Consulta el tiempo que llevas de prácticas"
	}
});

var clock = new Vue({
	el: "#reloj",
	data: {
		hora: "276",
		dia: '',
		horascumplidas: '',
		porcentaje: ''
	},
	methods: {
		calculo: function(){
			var hoy = new Date();
			// Dia de comienzo de las practicas
			var comienzo = new Date(2019,2,18,0,0);
			var diff = hoy.getTime() - comienzo.getTime();
			var horas = Math.round(diff / (1000*60*60));
			var dias = Math.round(horas / 24);
			var dias_semana = ["Lunes",'Martes', "Miércoles","Jueves","Viernes","Sábado","Domingo"];
			
			var dia = hoy.getDay();
			var hora = hoy.getHours();
			
			// Por un fallo que a las 11:30 cuenta que ha pasado un dia de mas. (ESTO FALLA ENTRE LAS 11 Y LAS 12 AM)
			
			// if((11*60+30) < (hora*60 + hoy.getMinutes()))
			// 	dias--;
			
			// Quitar lo que corresponde por semana y añadir lo que se ha cumplido en lo que va de semana
			var semanas = Math.trunc(dias /  7);
			var acumulador = dias*6 - 6*semanas*3;
					
			// Si es un dia de practicas y estas en horas, se aumenta cada una que pase
			if((dia==1)||(dia==2)||(dia==4)||(dia==5)){
				if((hora >= 8)&&(hora <= 14)){			
					acumulador += hora - 8;
				}
				
				// Según el dia de la semana, quitar los dias que no he hecho prácticas
				var pot = 0;
				if(dia>=4)
					pot = 1;
				else if(dia>=6)
					pot = 2;
				else if(dia==7)
					pot = 3;
				acumulador -= 6*pot;
			}
			
			// Para la semana de semana santa quitar 1a horas
			acumulador = acumulador - 2*6;
			
			
			this.horascumplidas = acumulador;
			this.dia = dias_semana[dia-1];
			this.porcentaje = Math.trunc(this.horascumplidas / 276 *100,2);
		}
	}
});

	clock.calculo();