// 最終課題を制作しよう

// キャラクター
let x, y; 
let vx, vy; 
const g = 1; 

// 障害物 1
let a, b;
let va, vb;

// 障害物 2
let c, d;
let vc, vd;

// 障害物 3
let e, f;
let ve, vf;

// ゲーム設定
let gameStarted = false;  
let gameOver = false;     


function setup(){
  createCanvas(windowWidth, windowHeight);

 // キャラクター
 x = width / 2;
 y = height / 2;
 vx = 0;
 vy = 0;

 // 障害物 1
 a = height / 15;
 b = height / 15;
 va = 10;
 vb = 10;

 // 障害物 2
 c = width / 10;
 d = width / 10;
 vc = 13;
 vd = 13;

 // 障害物 3
 e = width / 20;
 f = height / 20;
 ve = 15;
 vf = 15;

 // 初期位置
  resetGame();

 // スタートとリセットボタンをつくる
 startButton = createButton('スタート / リセット');
 startButton.position(15, 15); 
 startButton.mousePressed(resetGame); 
}

 // キャンパスをウィンドウの大きさに合わせる
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
  background(173, 216, 230);
  const size = height * 0.1;
  const groundY = height * 0.8;
 
  // 地面
  fill(152, 251, 152);
  rect(0, groundY, width, height - groundY);

  // キャラクター
  if(keyIsDown(LEFT_ARROW)){ x -= 10; }
  if(keyIsDown(RIGHT_ARROW)){ x += 10; }
  if(keyIsDown("A".charCodeAt(0))){ 
   if(keyIsDown(LEFT_ARROW)){ x -= 12; }
   if(keyIsDown(RIGHT_ARROW)){ x += 12; }
  }
  if(y > groundY - 62 && keyIsDown(" ".charCodeAt(0))){ 
   vy = -50
  }
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);
  y = constrain(y, 0, groundY - 62 );
  x += vx;
  y += vy;
  vy += g;
    
  fill(100);
  ellipse(x, y, size, size);

  // 障害物 1
  ellipse(a, b, size);
  
  a += va;
  b += vb;
  
  if(a < 0 || a > width){ va = -1 * va; }
  if(b < 0 || b > height){ vb = -1 * vb; }
  
  a = constrain(a, 0, width);
  b = constrain(b, 0, height);

  // 障害物 2
  ellipse(c, d, size);
  
  c += vc;
  d += vd; 
  
  if(c < 0 || c > width){ vc = -1 * vc; }
  if(d < 0 || d > height){ vd = -1 * vd; }
  
  c = constrain(c, 0, width);
  d = constrain(d, 0, height);

  // 障害物 3
  ellipse(e, f, size);
  
  e += ve;
  f += vf;
 
  if(e < 0 || e > width){ ve = -1 * ve; }
  if(f < 0 || f > height){ vf = -1 * vf; }
  
  e = constrain(e, 0, width);
  f = constrain(f, 0, height);

  // 衝突すればゲーム終了
  if (gameStarted && !gameOver) {
    if (
     hit(x, y, height*0.1, a, b, height*0.1) ||
     hit(x, y, height*0.1, c, d, height*0.1) ||
     hit(x, y, height*0.1, e, f, height*0.1)
    )
    {gameOver = true;
      noLoop();  
    }
  }

  // 衝突したら、黄色になり大きくなる
  if (gameOver){
   fill(255,255,0);
   ellipse(x, y, height*0.2, height*0.2);
  }

  // 衝突したら、ゲームオーバーの文字を出すS
  if (gameOver) {
   textSize(50);
   textAlign(CENTER, CENTER);
   fill(255, 255, 0);
   text("ゲームオーバー", width/2, height/2);
  }
}


// 衝突判定
function hit(x1, y1, r1, x2, y2, r2) {
  return dist(x1, y1, x2, y2) < (r1/2 + r2/2);
}

// ゲームをリセット
function resetGame() {
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
  a = width / 15; b = height / 15; va = 10; vb = 10;
  c = width / 10; d = height / 10; vc = 13; vd = 13;
  e = width / 20; f = height / 20; ve = 15; vf = 15;
  gameStarted = true;
  gameOver = false;
  loop();
}
