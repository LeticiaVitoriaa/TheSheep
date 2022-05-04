const largura_jogo = 800;
const altura_jogo = 600;

//constrói a sprite principal, ovelha
class Sprite {
            constructor(x, y, wid, he, imagem) {
                this.x = x;
                this.y = y;
                this.wid = wid;
                this.he = he;
                this.imagem = imagem;
            }

            desenhar(ctx) {
                if (this.imagem) {
                    ctx.drawImage(this.imagem, this.x, this.y, this.wid, this.he);                    
                }
                else 
                    ctx.strokeRect(this.x, this.y, this.wid, this.he);   
            }

            get centro() {
                return {
                    x:this.x + this.wid/2,
                    y:this.y + this.he/2
                };
            }
            colideCom(outraSprite) {
                // verifica se essa stripe atingiu outra
                let a = Math.abs(outraSprite.centro.x - this.centro.x);
                let b = Math.abs(outraSprite.centro.y - this.centro.y);
                let d = Math.sqrt(a ** 2 + b ** 2);
                let r1 = this.he/2;
                let r2 = outraSprite.he/5;
                
                return d <= r1 + r2;
            }
        }

// constrói sprite Nave
class Nave extends Sprite {
    constructor() {
        super(Math.random() * (largura_jogo - 100), 0, 100, 100, nave);
        this.velocidadeY = 2 * Math.random() + 1;
    }

    atualizar() {
        this.y += this.velocidadeY;

        if(this.y - this.he > altura_jogo) {
            this.y = 0;
            this.x = Math.random() * (largura_jogo - 100);
        }
    }

    destruir () {
        this.y = 0;
        this.x = Math.random() * (largura_jogo - 100);

        const som = new Audio();
        som.src = 'sounds/cartoon_tiro.mp3';
        som.preload = 'auto';
        som.play();
    }
}

// constrói sprite de Tiros
class Tiro extends Sprite {
    constructor(vaquinha) {
        super(vaquinha.centro.x, vaquinha.centro.y, 40, 40, feno);
        this.velocidadeY = 2 * Math.random() + 1;
    }

    atualizar() {
        this.y -= this.velocidadeY;

        if( this.y > altura_jogo) {
            this.podeserDestruido = true;
        }
    }
}

        let canvasEl = document.querySelector('#jogo');
        let ctx = canvasEl.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        
        let vidas = 5;
        let pontos = 0;
        let vaquinhaImagem = new Image();
        vaquinhaImagem.src = 'imgs/ovelhinha.gif';
        let vaquinha =  new Sprite(440, 500, 80, 80, vaquinhaImagem);

        vaquinhaImagem.addEventListener('load', (e) => {
            desenhajogo();
        })

        let nave = new Image();
        nave.src = 'imgs/nave.png';
        
        let naveImg = [];
        naveImg.push(new Nave());    
        naveImg.push(new Nave()); 
        naveImg.push(new Nave()); 
        naveImg.push(new Nave());     
        
        let feno = new Image();
        feno.src = 'imgs/feno.png';
        let tiros = [];

        //move a ovelhinha de acordo com o mouse
        canvasEl.addEventListener('mousemove', (e) => {
            vaquinha.x = e.offsetX - (vaquinha.wid/2);
            vaquinha.y = e.offsetY - (vaquinha.he/2);
            desenhajogo();
        });

// Funções abaixo

        function atualizaInimigos () {
            //atualiza posição das naves
            for (let nave of naveImg) {
                nave.atualizar();
            }
        }

        function atualizaTiros() {
             // atualizar posição dos tiros
             for (let tiro of tiros) {
                tiro.atualizar();
            }

            //removendo tiros do vetor
            for( let i = 0; i < tiros.length; i++) {
                if (tiros[i].podeserDestruido) {
                    tiros.splice(i, 1);
                }
            }
        }

        function verificaColisoes() {
             // verifica se alguma nave atingiu o jogador
             for (let nave of naveImg) {
                const atingiu = nave.colideCom(vaquinha);
                if (atingiu) {
                    nave.destruir();
                    vidas -= 1;
                    if (vidas < 0){
                        alert('A ovelhinha morreu, tente novamente!!')
                    }
                }
            }

            //verificar colisão entre tiros e naves
            for (let nave of naveImg) {
                for (let tiro of tiros) {
                    const tiroAtingiuNave = tiro.colideCom(nave);
                    if (tiroAtingiuNave) {
                        tiro.podeserDestruido = true;
                        nave.destruir();
                        pontos += 5;
                    }
                }
            }
        }

        //cria tiro
        function atirar() {
            let tiro = new Tiro(vaquinha);
            tiros.push(tiro);
        }

        //ação de atirar
        document.body.addEventListener('keydown', e => {
            if (e.key === ' ') {
                atirar();
                
            // previne que o navegador role a página (pq apertou <espaço>)
            e.preventDefault();
            }
        });

        //redesenha o jogo
        function desenhajogo() {
            ctx.clearRect(0, 0, largura_jogo, altura_jogo);
            vaquinha.desenhar(ctx);

            for(let nav of naveImg) {
                nav.desenhar(ctx);
            }

            for(let tir of tiros) {
                tir.desenhar(ctx);
            }

            // vidas
            ctx.fillStyle = 'rgba(255, 147, 113, 0.7';
            ctx.font = "25px 'Bangers'";
            ctx.fillText(`${vidas} Vida(s)`, 10, 25);
            ctx.fillText(`${pontos} Pontos`, 700, 25);
        }

        function atualizaLogicaJogo() {

            atualizaInimigos();
            atualizaTiros();
            verificaColisoes();
            
            //redesenha o jogo
            desenhajogo();
        }

        setInterval(atualizaLogicaJogo, 33);
        