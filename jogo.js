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
        }
// constrói sprite Nave
class Nave extends Sprite {
    constructor() {
        super(Math.random() * (largura_jogo - 100), altura_jogo, 100, 100, nave);
        this.velocidadeY = -2 * Math.random() - 1;
    }

    atualizar() {
        this.y += this.velocidadeY;

        if(this.y + this.he < 0) {
            this.y = altura_jogo;
            this.x = Math.random() * (largura_jogo - 80);
        }
    }
}

        let canvasEl = document.querySelector('#jogo');
        let ctx = canvasEl.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        
        let vaquinhaImagem = new Image();
        vaquinhaImagem.src = 'imgs/ovelhinha.gif';
        let vaquinha =  new Sprite(440, 500, 100, 100, vaquinhaImagem);

        vaquinhaImagem.addEventListener('load', (e) => {
            desenhajogo();
        })

        let nave = new Image();
        nave.src = 'imgs/nave.png';
        
        let naveImg = [];
        naveImg.push(new Nave());    
        naveImg.push(new Nave()); 
        naveImg.push(new Nave());     
        ;
        
        nave.addEventListener('load', (e) => {
            desenhajogo();
        });
        
        
        //move a ovelhinha de acordo com o mouse
        canvasEl.addEventListener('mousemove', (e) => {
            vaquinha.x = e.offsetX - (vaquinha.wid/2);
            vaquinha.y = e.offsetY - (vaquinha.he/2);
            desenhajogo();
        });

        setInterval(() => {
            for (let nav of naveImg) {
                nav.atualizar();
            }
            desenhajogo();
        }, 33);
        
        //desenha os personagens na tela
        function desenhajogo() {
            ctx.clearRect(0, 0, 800, 600);
            vaquinha.desenhar(ctx);

            for(let nav of naveImg) {
                nav.desenhar(ctx);
            }
        }
