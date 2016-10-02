var container = document.getElementById("container");
var food = document.getElementById("food");
var snake = document.getElementsByClassName("snake");
var msg = document.getElementById("msg");
var again = document.getElementById("again");
var con = document.getElementById("con");

/* 定义食物的x、y坐标 */
var x;
var y;
/* 定义贪吃蛇的速度 */
var speed = 1;
/* 定义贪吃蛇运动方向的标志 */
var flag = 0;
/* 定义周期函数的值，便于进行清除周期函数 */
var timer;
/* 设置贪吃蛇是否停止运动的标志 */
var win;
/* 定义贪吃蛇移动前最后一个身体部位的坐标，当贪吃蛇吃到食物后，增加的身体部分的坐标定义在此处*/
var lastX;
var lastY;
/* 定义贪吃蛇所有身体部位坐标的集合 */
var snakeARR = [];

window.onload = init;

window.onkeydown = turnDirection;

again.onclick = startAgain;

/* 进行初始化操作 */
function init() {
    win = 0;
    flag = 0;
    generateFood();
    generateSnake();
    move();
}

/* 重新游戏 */
function startAgain() {
    var len = snake.length;
    for ( var i=0; i<len; i++ ) {
        container.removeChild(snake[0]);
    }
    snakeARR = [];
    msg.style.display = 'none';
    init();
}

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
        lastX = snakeARR[snakeARR.length-1].x;
        lastY = snakeARR[snakeARR.length-1].y;
        for ( var i=snakeARR.length-1; i>=1; i-- ) {
            snakeARR[i].x = snakeARR[i-1].x;
            snakeARR[i].y = snakeARR[i-1].y
        }
        if ( flag==0 ) {
            snakeARR[0].x += speed;
        } else if ( flag==1 ) {
            snakeARR[0].y += speed;
        } else if ( flag==2 ) {
            snakeARR[0].x -= speed;
        } else if ( flag==3 ) {
            snakeARR[0].y -= speed;
        }
        judge();
        if ( isEat() ) {
            bigger();
            generateFood();
        }
        die();
        winning();
        drawSnake();
    }, 200);
}

/* 判断是否胜利 */
function winning() {
    if ( snakeARR.length>=100 ) {
        msg.style.display = 'block';
        con.innerHTML = 'Congratulations! You win!';
        clearInterval(timer);
        win = 1;
    }
}

/* 判断是否因为吃到自己而死亡 */
function die() {
    if ( inSnakes(snakeARR[0].x, snakeARR[0].y, 1) ) {
        msg.style.display = 'block';
        con.innerHTML = "Sorry, you failed!";
        clearInterval(timer);
        win = 1;
    }
}

/* 吃到食物二变大 */
function bigger() {
    food.style.display = 'none';
    snakeARR.push({x:lastX, y:lastY});
    generateBody();
}

/* 判断贪吃蛇是吃到食物 */
function isEat() {
    if ( x==snakeARR[0].x && y==snakeARR[0].y ) {
        return true;
    }
    return false;
}

/* 判断贪吃蛇是否在边界 */
function judge() {
    if ( snakeARR[0].y<0 && flag==3 ) {
        snakeARR[0].y = 49;
    } else if ( snakeARR[0].y>=50 && flag==1 ) {
        snakeARR[0].y = 0;
    }
    if ( snakeARR[0].x<0 && flag==2 ) {
        snakeARR[0].x = 49;
    } else if ( snakeARR[0].x>=50 && flag==0 ) {
        snakeARR[0].x = 0;
    }
}

/* 生成贪吃蛇的食物 */
function generateFood() {
    do{
        x = random();
        y = random();
    } while( inSnakes(x, y, 0) );
    food.style.left = x*10 + 'px';
    food.style.top = y*10 + 'px';
    food.style.display = 'block';
}

/* 生成贪吃蛇 */
function generateSnake() {
    snakeARR.push({x:random(), y:random()});
    generateBody();
    drawSnake();
}

/* 生成贪吃蛇的躯体 */
function generateBody() {
    var node = document.createElement("div");
    node.className = 'snake';
    container.appendChild(node);
}

/* 在容器中画出蛇身 */
function drawSnake() {
    for ( var i=0; i<snakeARR.length; i++ ) {
        snake[i].style.position = "absolute";
        snake[i].style.transition = "all 0.5 ease";
        snake[i].style.width = 10 + 'px';
        snake[i].style.height = 10 + 'px';
        snake[i].style.left = snakeARR[i].x*10 + 'px';
        snake[i].style.top = snakeARR[i].y*10 + 'px';
        snake[i].style.backgroundColor = "#fff";
    }
}

/* 判断食物出现的位置是否与蛇身重合 */
function inSnakes(x, y, index) {
    for ( var i=index; i<snakeARR.length; i++ ) {
        if ( snakeARR[i].x==x&&snakeARR[i].y==y ) {
            return true;
        }
    }
    return false;
}

/* 随机生成0-49中的数字 */
function random() {
    return Math.floor(Math.random()*49);
}
