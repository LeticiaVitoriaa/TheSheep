class Sprite {
            constructor(x, y, w, he, im) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.he = he;
                this.im = im;
                //this.veloc = 50;
                //this.pos = 240;
            }

            desenhar(ctx) {
                if (this.im) {
                    ctx.drawImage(this.im, this.x, this.y, this.w, this.he);                    
                }
                else 
                    ctx.strokeRect(this.x, this.y, this.w, this.he);   
            }
        }

        let canvasEl = document.querySelector('#jogo');
        let ctx = canvasEl.getContext('2d');
        
        let vaquinhaImagem = new Image();
        vaquinhaImagem.src = 'imgs/ovelhinha.gif';
        let vaquinha =  new Sprite(440, 500, 80, 80, vaquinhaImagem);

        let nave =  new Image();
        nave.src = 'imgs/nave.png';
        let naveImg = []
        naveImg.push(new Sprite(350, 30, 100, 100, nave));        
        
        vaquinhaImagem.addEventListener('load', (e) => {
            desenhajogo();
        });
        
        nave.addEventListener('load', (e) => {
            desenhajogo();
        });
        
        canvasEl.addEventListener('mousemove', (e) => {
            vaquinha.x = e.offsetX - (vaquinha.w/2);
            vaquinha.y = e.offsetY - (vaquinha.he/2);
            desenhajogo();
        });

        //setInterval(desenhajogo(), 33);
        
        function desenhajogo() {
            ctx.clearRect(0, 0, 800, 600);
            vaquinha.desenhar(ctx);

            for(let nav of naveImg) {
                nav.desenhar(ctx);
            }
            
            ctx.strokeStyle = 'yellowgreen';
            //ctx.globolAlpha = 0.5;
            ctx.fillStyle = 'rgba(170, 204, 131, 0.5)';
            
            ctx.beginPath();
            ctx.moveTo(400, 126);
            ctx.lineTo(325, 300);
            ctx.lineTo(490, 300)
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        
