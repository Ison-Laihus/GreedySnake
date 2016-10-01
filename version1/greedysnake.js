var container = document.getElementById("container");
var snake = document.getElementById("snake");
var food = document.getElementById("food");
var mouse = document.getElementById("mouse");

var x;
var y;
var sx;
var sy;
var sr = 5;
var sp = 0.2;
var timer;
// 0:right;	1:down;	2:left;	3:top
var flag = 0;
var win;


window.onload = init;

/* 初始化函数 */
function init() {
	win = 0;
	generateSnake();
	generateFood();
	move();
}

/* 按压键盘事件 */
window.onkeydown = turnDirection;

/* 改变方向函数 */
function turnDirection(e) {
	if ( !win ) {
		switch(e.keyCode) {
			case 37:
				turnLeft();
				break;
			case 38:
				turnTop();
				break;
			case 39:
				turnRight();
				break;
			case 40:
				turnDown();
				break;
			default:
				break;
		}
	}
	
}

/* 左拐 */
function turnLeft() {
	if ( flag==1 || flag==3 ) {
		flag = 2;
		move();
	}
}

/* 右拐 */
function turnRight() {
	if ( flag==1 || flag==3 ) {
		flag = 0;
		move();
	}
}

/* 下拐 */
function turnDown() {
	if ( flag==0 || flag==2 ) {
		flag = 1;
		move();
	}
}

/* 下拐 */
function turnTop() {
	if ( flag==0 || flag==2 ) {
		flag = 3;
		move();
	}
}

/* 贪吃蛇进行移动 */
function move() {
	clearInterval(timer);
	timer = setInterval(function(){
		if ( flag==0 ) {
			sx += sp;
		} else if ( flag==1 ) {
			sy += sp;
		} else if ( flag==2 ) {
			sx -= sp;
		} else if ( flag==3 ) {
			sy -= sp;
		}
		judge();
		isBigger();
		setSnakeLocation();
	}, 50);
}

/* 判断贪吃蛇是否吃到食物而长大 */
function isBigger() {
	if ( isEat() ) {
		food.style.display = 'none';
		sr = Math.sqrt( (Math.PI*sr*sr+100)/Math.PI );
		isWin();
		setSnakeSize();
		generateFood();
	}
}

/* 判断是否胜利 */
function isWin() {
	if ( sr >= 20 ) {
		clearInterval(timer);
		win = 1;
		alert("Congratulations! You win!");
	}
}

/* 判断贪吃蛇是否在边界 */
function judge() {
	if ( sy<=0 && flag==3 ) {
		sy = 50;
	} else if ( sy>=50 && flag==1 ) {
		sy = 0;
	}
	if ( sx<=0 && flag==2 ) {
		sx = 50;
	} else if ( sx>=50 && flag==0 ) {
		sx = 0;
	}
}

/* 生成贪吃蛇的食物 */
function generateFood() {
	do{
		x = random();
		y = random();
	} while( isEat() );
	food.style.left = x*10 + 'px';
	food.style.top = y*10 + 'px';
	food.style.display = 'block';
}

/* 判断贪吃蛇是吃到食物 */
function isEat() {
	var cx = x*10+5;
	var cy = y*10+5;
	var csx = sx*10+sr;
	var csy = sy*10+sr;
	return ( Math.sqrt( (cx-csx)*(cx-csx)+(cy-csy)*(cy-csy) ) <= sr+5 );
}

/* 生成贪吃蛇 */
function generateSnake() {
	sx = random();
	sy = random();
	setSnakeLocation();
	setSnakeSize();
}

/* 设置贪吃蛇的位置坐标 */
function setSnakeLocation() {
	snake.style.left = sx*10 + 'px';
	snake.style.top = sy*10 + 'px';
}

/* 设置贪吃蛇的尺寸 */
function setSnakeSize() {
	snake.style.borderRadius = sr + 'px';
	snake.style.width = 2*sr + 'px';
	snake.style.height = 2*sr + 'px';
	mouse.style.borderRadius = sr/10 + 'px';
}

/* 随机生成0-49中的数字 */
function random() {
	return Math.floor(Math.random()*50);
}
