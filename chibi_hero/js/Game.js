

function Game(canvas, ctx) {
    // console.log(canvas);
    canvas.width = 1200;
    canvas.height = 650;
    var that = this;

    var frames = 0;
    this.enemyArray = [];
    // this.maxYPos = -150;

    //load sprite image
    var sprite_bg = new Image();
    sprite_bg.src = 'images/bg_01.png';

    this.sprite_hero_1 = new Image();
    this.sprite_hero_1.src = 'images/chibihero01_idle.png';
    this.goRightSprite = new Image();
    this.goRightSprite.src = 'images/chibichar_sheet1.png';
    this.goLeftSprite = new Image();
    this.goLeftSprite.src = 'images/chibichar_sheet3.png';

    this.sprite_enemy_1 = new Image();
    this.sprite_enemy_1.src = 'images/enemy01_sheet0.png';
    // this.surikenSprite = new Image();
    // this.surikenSprite.src = 'images/shuriken_item_sheet0.png';


    this.currentAnimation=this.sprite_hero_1;
    this.checkCollision;
    //background image setup
    this.sX = 0;
    this.sY = 0;
    this.width = 1280;
    this.height = 700;
    this.x = 0; // destination left position
    this.y = canvas.height - this.height; //destination top position

    this.setviewportX = 0;
    this.setviewportY = 0;

   

    this.gravity = 3;
    this.hold=1;        //hold has two value true orfalse if true hero is hold in tile else fall

    //GAME STATE
    var state = {
        current: 0,
        getReady: 0,
        game: 1,
        over: 2
    };


 


    var score = 0;
    var best = score;

    // this.baseGround = new BaseGround(canvas.height);

    this.map = new Maps(game1);
    this.hero = new Hero(game1, this.map);
    this.bot = new Bot(game1, this.map);
    this.map.init();

    this.gameLoop = function () {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        that.control();
        that.draw();
        that.update();
        // console.log(frames);

        frames++;
        requestAnimationFrame(that.gameLoop);
    }

    this.draw = function () {

        //bg color
        // ctx.fillStyle = '#4ec0ca';

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // background image draw
        ctx.drawImage(sprite_bg, this.sX, this.sY, this.width, this.height,
            this.x, this.y, this.width, this.height);

        ;
        this.map.drawMap(ctx);
        this.hero.draw(ctx,this.currentAnimation);
        this.bot.draw(ctx);




        if (state.current == state.getReady) {
            // ctx.drawImage(sprite, 0, 229, 173, 45,
            //     canvas.width / 2 - 173 / 2, 130, 173, 45);
            // ctx.strokeText("Tap to play", 100, 200);
        }

        //game over message
        if (state.current == state.over) {
            // ctx.drawImage(sprite, 175, 229, 225, 200,
            //     canvas.width / 2 - 225 / 2, 150, 225, 200);
        }
        // that.renderCurrentScore(ctx);

    }


    this.update = function () {
        // if (state.current == state.game) {
        //     that.bird.update();
        //     that.baseGround.update();
        //     that.checkGroundCollision();
        //     that.generatePipes();
        //     that.checkPipeCollision();
        // }


        //falling hero
        this.checkDownTile();
       
    }
    var x = this.hero.x;
    // console.log('fromgame hero x',x);

    this.checkCollision = function () {

        let i = Math.floor((this.hero.y + 50) / 50);
        let j = Math.floor((this.hero.x_old) / 50);
        console.log('hero value old x', this.hero.x_old);
        console.log('hero value this x', this.hero.x);
        console.log(' i', i, 'j', j);

        // console.log(x);

        if (this.map.map1[i][j] == 1 || this.map.map1[i][j] == 2) {
            // this.state.current=this.state.over;
            console.log('collision detected at i', i, 'j', j);


        }

    }


    this.checkDownTile = function () {
        let i = Math.floor((this.hero.y + 100) / 50); //one step down than current y
        let j = Math.floor((this.hero.x_old / 50)); //current y position
        if (this.map.map1[i][j] == 1 || this.map.map1[i][j] == 2) {
            // this.state.current=this.state.over; 
            this.hold=0;   //hold flag true means hold flag set to hold the player in the tile  
            // console.log('collision detected at i', i, 'j', j);


        }
        else{
            this.hero.y = this.hero.y + this.gravity;
            if(this.hero.y>550){
                state.current=state.over;
            }
            
        }

    }

    console.log('map cordinate', this.map.map1[10][10]);



    this.control = function () {

        window.onkeydown = function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            var x;
            if (key == 37) {
                console.log("left");

                x = -50;
                this.currentAnimation=this.goLeftSprite;
                that.hero.moveLR(x);


                console.log(that.hero.x);
                console.log('view port x', that.setviewportX);


                if (that.setviewportX <= 0) {
                    this.setviewportX = 600;
                }
                else {
                    that.setviewportX = that.setviewportX - 50;
                }
                that.map.updateViewPortX(that.setviewportX);





            } else if (key == 39) {
                console.log("right");
                x = 50;
                that.currentAnimation=that.goRightSprite;
               
                that.hero.moveLR(x);
                // ctx.translate(-10, 20);
                // that.hero.movestate = 2;
                that.checkCollision();
                console.log(that.hero.x);
                console.log("viewport x", that.setviewportX);
                if (that.hero.x_old > 600) {
                    that.setviewportX = that.setviewportX + 50;
                    if (that.setviewportX >= 1700) {
                        that.setviewportX = 1700;
                    }

                    that.map.updateViewPortX(that.setviewportX);
                }
                

            }

            else if (key == 38) {
                console.log("up");
                y = -50;

                this.setTimeout(that.hero.moveUD(y),3000);
                // this.setTimeout(that.hero.moveUD(y),3000);
                // this.setTimeout(that.hero.moveUD(y),3000);
                //this is for updating map
                // if (that.hero.x > canvas.width / 2) {
                //     that.setviewportX = that.setviewportX + 50;
                //     if (that.setviewportX >= 1700) {
                //         that.setviewportX = 1700;
                //     }
                //     that.map.updateViewPortX(that.setviewportX);
                // }
            }
            else if (key == 40) {
                console.log("down");
                y = 150;
                that.hero.moveUD(y);
                that.checkDownTile();

            }

            else if (key == 88) {
                console.log("fire");
                

               

            }
        };
    }
    window.onkeyup = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        var x;
        if (key == 37) {
            console.log(" key up left");

   

        } else if (key == 39) {
            console.log("right");
            x = 50;
            that.currentAnimation=that.sprite_hero_1;
           
            

        }

        else if (key == 38) {
            console.log("up");
            y = -50;

            this.setTimeout(that.hero.moveUD(y),3000);
            // this.setTimeout(that.hero.moveUD(y),3000);
            // this.setTimeout(that.hero.moveUD(y),3000);
            //this is for updating map
            // if (that.hero.x > canvas.width / 2) {
            //     that.setviewportX = that.setviewportX + 50;
            //     if (that.setviewportX >= 1700) {
            //         that.setviewportX = 1700;
            //     }
            //     that.map.updateViewPortX(that.setviewportX);
            // }
        }
        else if (key == 40) {
            console.log("down");
            y = 150;
            that.hero.moveUD(y);
            that.checkDownTile();

        }

        else if (key == 88) {
            console.log("fire");
            

           

        }
    };
}




var canvas1 = document.getElementById('gameCanvas');
// canvas1.style.backgroundImage="red";
var ctx1 = canvas1.getContext('2d');
var game1 = new Game(canvas1, ctx1).gameLoop();

// var canvas2 = document.getElementById('game-container2');
// var ctx2 = canvas2.getContext('2d');
// var game2 = new Game(canvas2, ctx2).gameLoop();


