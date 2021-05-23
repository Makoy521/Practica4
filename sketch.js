
let titulosAlgo = ["Algoritmo Punto Pendiente", "Algoritmo DDA", "Algoritmo Bresenham"];
let radius = 150;
let centx = 0;
let centy = 350;
let x,y;


function setup() {
	createCanvas(windowWidth, windowHeight);	
}

function ecuPP(x1, y1, x2, y2){
	let x = x1;
	let y = y1;
	let stepX = 1;
	let stepY = 1;
	const dx = x2 - x1;
	const dy = y2 - y1;

	if(dx==0){
		if(dy < 0){
			stepY = -1;
		}
		while(y!= y2){
			point(x, y);
			y+= stepY;
		}
	}else{
		const m = dy / dx;
	    const b = y1 - (m * x1);
		if(dx <0) stepX = -1;
		while(x != x2){
			point(x, y);
			x+= stepX;
			y = m * x + b;
		}
    }
};

function ecuDDA(x1, y1, x2, y2){
	let dx = x2 - x1;
	let dy = y2 - y1;
	let pp;
	let x, y, auxx, auxy;
	let i = 1;

	if(abs(dx) > abs(dy)){
		pp = abs(dx);
	}
	else{
		pp = abs(dy);
	}

	auxx = dx / pp;
	auxy = dy / pp;
	x = x1;
	y = y1;

	while(i <= pp){
		point(x,y);
		x = x + auxx;
		y = y + auxy;
		i = i + 1; 
	}
};

function ecuBresenham(x1, y1, x2, y2){
    let x = x1;
    let y = y1;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let sx = 1;
    let sy = 1;
  
    if (dy < 0) {
      dy = -dy;
      sy = -1;
    }
    if (dx < 0) {
      dx = -dx;
      sx = -1;
    }
  
    if (dx > dy) {
      let p = 2 * dy - dx;
      while (x != x2) {
        point(x, y);
        x += sx;
        if (p < 0) {
          p += 2 * dy;
        } else {
          y += sy;
          p += 2 * (dy - dx);
        }
      }
    } else {
      let p = 2 * dx - dy;
      while (y != y2) {
        point(x, y);
        y += sy;
        if (p < 0) {
          p += 2 * dx;
        } else {
          x += sx;
          p += 2 * (dx - dy);
        }
      }
    }
  };

function draw() {
    titulos();
    generar();
}

function generar(){
    for (let j = 0; j < 3; j++) {
        centx+=(radius*2)+40;
		fill("#C80C42");
        circle(centx, centy, radius*2);
        for (let ang = 0; ang <= 360; ang += 45) {
            let rad = radians(ang);
            x = Math.floor(centx + (radius * cos(rad)));
            y = Math.floor(centy + (radius * sin(rad)));
            switch(j){
                case 0:
                    ecuDDA(centx, centy, x, y);
                break;
                case 1:
                    ecuPP(centx, centy, x, y);
                break;
                case 2: 
                    ecuBresenham(centx, centy, x, y);
                break;
            }

          }
    }
    noLoop();
}

function titulos(){
    background(255);
    stroke(0);
	fill(0);
    textSize(20);

	text(titulosAlgo[1], 280, 150);
	text(titulosAlgo[0], 550, 150);
	text(titulosAlgo[2], 950, 150);
}