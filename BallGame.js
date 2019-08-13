var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//variables defination for ball
var x = canvas.width/2;
var y = canvas.height-30;
var radius = 10;
var dx = 2;
var dy = -2;

//variable defination for boxes
var paddleHeight = 7;
var paddleWidth = 70;
var paddleX = (canvas.width-paddleWidth)/2;
var rightKey = false;
var leftKey = false;

//variable declaration for brick wall
var bRowCount = 4;
var bColumnCount = 8;
var bWidth = 50;
var bHeight = 20;
var bPadding = 10;
var bMarginTop = 20;
var bMarginLeft = 5;
                    //intialising the brick array
var bricks = [];
for(var c =0 ; c < bColumnCount ; c++)
{
    bricks[c] = [];
    for(var r =0 ; r <bRowCount ; r++)
    {                                                                 
        bricks[c][r] = { x:0, y:0, print:1  };
    }
}

//variable declaration for score 
var score = 0;

//variable declarationd for lives
var lives = 2;

//variable for level check
var level = 1;

//detects that key is pressed 
function pressKey(e) 
{
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightKey = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftKey = true;
    }
}

//detects that key is released now 
function releaseKey(e) 
{
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightKey = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftKey = false;
    }
}

//for handeling mouse movements across the game
function mouseMove(e)
{
    var tempX = e.clientX - canvas.offsetLeft;
    if(tempX > 0 && tempX < canvas.width)
        paddleX = tempX - paddleWidth/2;
}

//for detecting collision 
function collisionDetector()
{
    for(var c = 0 ; c < bColumnCount ; c++)
    {
        for(var r = 0 ; r < bRowCount ; r++)
        {
            var temp = bricks[c][r];
            if(temp.print == 1)
            {
                if(temp.x < x && x < temp.x + bWidth && y > temp.y && y < temp.y+bHeight)
                {
                    dy = -dy;
                    temp.print = 0;
                    score++;
                    if(score == bColumnCount*bRowCount )
                    {
                        alert("Congratulations, You Won!!");
                        document.location.reload();
                        //clearInterval(interval);
                    }
                }
            }
        }
    }
}

//for drawing scores
function drawScore()
{
    ctx.font = "14px Arial";
    ctx.fillStyle = "#a84242";
    ctx.fillText("Score: " + score , 4 , 15);
}

//for drawing lives
function drawLives()
{
    ctx.font = "14px Arial";
    ctx.fillStyle = "#a84242";
    ctx.fillText("Lives: " + lives , canvas.width-65 , 15);
}

//drawing paddles
function drawPaddle()
{
    //make reactangle
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "wheat";
    ctx.fill();
    ctx.closePath();
}

//drawing bricks
function drawBricks()
{
    for(var c =0 ; c < bColumnCount ; c++)
    {
        for(var r =0 ; r <bRowCount ; r++)
        {
            if(bricks[c][r].print == 1)
            {
                var brickX = (c*(bWidth+bPadding))+bMarginLeft;
                var brickY = (r*(bHeight+bPadding))+bMarginTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,bWidth,bHeight);
                ctx.fillStyle = "lightgreen";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//main funciton 
function draw1()
{
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    //make ball
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fillStyle = "lightcoral";
    ctx.fill();
    ctx.closePath();

    drawPaddle();

    //check boundaries 
    if ( x + dx > canvas.width-radius || x + dx < radius )
        dx = -dx;
    if ( y + dy < radius )
        dy = -dy;
    else if ( y+ dy > canvas.height-radius)
    {
        if(x > paddleX && x < paddleX + paddleWidth)
            dy = -dy;
        else 
        { 
            //callAlert();
            lives--;
            if(lives == 0)
            {
                alert("GAME OVER!!");
                document.location.reload();
            }
            else
            {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    collisionDetector();
    drawScore();
    drawLives();

    //modify the co-ordinates
    x = x + dx;
    y = y + dy;

    //modify and check the paddle co-ordinates
    if(rightKey && paddleX < canvas.width - paddleWidth)
        paddleX += 7;
    if(leftKey && paddleX > 0)
        paddleX -= 7;

    requestAnimationFrame(draw1);
}

document.addEventListener("keydown",pressKey,false);
document.addEventListener("keyup",releaseKey,false);
document.addEventListener("mousemove", mouseMove, false);

draw1();
// function callAlert()
// {
//     $.alert({
//         title: 'Alert!',
//         content: 'Game Over',
//         //closeIcon: false,
//         //transform: rotate(400deg) scale(0),
//         //theme: 'supervan'
//     });
// }