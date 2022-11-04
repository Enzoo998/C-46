var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zumbi, zumbiImg, zumbiGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullets = 70;
var bulletgroup;
var life = 3;
var score = 0;
var gameState = "fight";
var lose, winning, explosionSound;

function preload() {

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zumbiImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //criando o sprite do jogador
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  //player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20);
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

  zumbiGroup = new Group()
  bulletgroup = new Group()
}

function draw() {
  background(0);

  if (gameState === "fight") {
    if (life === 3) {
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if (life === 2) {
      heart3.visible = false
      heart1.visible = false
      heart2.visible = true
    }
    if (life === 1) {
      heart3.visible = false
      heart1.visible = true
      heart2.visible = false
    }
    if (life === 0) {
      gameState = "lost"
    }
    if (score == 100) {
      gameState = "won"
    }
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if (keyDown("w") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("s") || touches.length > 0) {
      player.y = player.y + 30
    }
    if (keyDown("d") || touches.length > 0) {
      player.x = player.x + 30
    }
    if (keyDown("a") || touches.length > 0) {
      player.x = player.x - 30
    }
    if (keyWentDown("e")) {
      bullet = createSprite(player.x, player.y - 25, 20, 5)
      bullet.velocityX = 20;

      bulletgroup.add(bullet);
      player.depth = bullet.depth;
      player.depth = player.depth + 2;
      player.addImage(shooter_shooting)
      bullets = bullets - 1;
    }

    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if (keyWentUp("e")) {
      player.addImage(shooterImg)
    }
    if (bullets == 0) {
      gameState = "bullet"
    }
    if (zumbiGroup.isTouching(player)) {

      for (var i = 0; i < zumbiGroup.length; i++) {
        if (zumbiGroup[i].isTouching(player)) {
          zumbiGroup[i].destroy()
          life = life - 1
        }
      }
    }

    if (zumbiGroup.isTouching(bulletgroup)) {
      for (var i = 0; i < zumbiGroup.length; i++) {
        if (zumbiGroup[i].isTouching(bulletgroup)) {
          zumbiGroup[i].destroy();
          bulletgroup.destroyEach()
          score = score + 2
        }
      }
    }
    inimigos()

  }
  drawSprites();

  textSize(20)
  fill("white")
  text("Balas = " + bullets, displayWidth - 210, displayHeight / 2 - 250)
  text("Pontuação = " + score, displayWidth - 200, displayHeight / 2 - 220)
  text("Vidas = " + life, displayWidth - 200, displayHeight / 2 - 280)

  if (gameState == "lost") {
    textSize(100)
    fill("red");
    text("você perdeu", windowWidth / 2, windowHeight / 2)
    player.destroy()
    zumbiGroup.destroyEach()
  }
  else if (gameState == "won") {
    textSize(100);
    fill("yellow")
    text("Você venceu", 400, 400)
    zumbiGroup.destroyEach()
    player.destroy()
  }
  else if (gameState == "bullet") {
    textSize(50)
    fill("yellow")
    text("Você não tem mais balas", windowWidth / 2, windowHeight / 2)
    zumbiGroup.destroyEach()
    player.destroy()
    bulletgroup.destroyEach()
  }
}
function inimigos() {
  if (frameCount % 50 === 0) {
    zumbi = createSprite(player.x + 300, random(100, 500), 40, 40);
    zumbi.addImage(zumbiImg);
    zumbi.scale = 0.15;
    zumbi.velocityX = -3;
    zumbi.debug = true;
    zumbi.setCollider("rectangle", 0, 0, 400, 400);
    zumbi.lifetime = 400;
    zumbiGroup.add(zumbi)
  }
}