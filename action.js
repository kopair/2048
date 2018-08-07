var board = new Array();
var score = 0;


$(document).ready(function () {
    newgame();
});

function newgame() {
// 初始化棋盘格
    init();

    generateOneNumber();
    generateOneNumber();
}
function init() {
    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++){
            var gridCell=$("#grid-"+i+"-"+j);
            // console.log(gridCell);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
    for (var i=0; i<4; i++){
        board[i]=new Array();
        for (var j=0; j<4; j++){
            board[i][j]=0;
        }
    }
    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-'+i+'-'+j);

            if (board[i][j] ==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));

            }
            else {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background',getUmberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
function generateOneNumber() {
    if (nospace(board))
        return false;
// 随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    while (true){
        if (board[randx][randy]==0)
            break;

        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    // 随机一个数字
    var randNumber = Math.random()<0.5?2:4;


    // 在随机的位置显示随机数
    board[randx][randy] =randNumber;
    showNumberWithAnimetion(randx,randy,randNumber);

    return true;
}


$(document).keydown(function (event) {
    switch(event.keyCode){
        case 37: //left
            if ( moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if ( moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if ( moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if ( moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover() {
    if (nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover() {
    alert("gameover!");
}

function moveLeft() {
    if (!cantMoveLeft(board)){
        return false;
    }
    for (var i=0;i<4;i++){
        for (var j=1;j<4;j++) {
            if (board[i][j]!=0 ){
                for (var k=0;k<j;k++){
                    if (board[i][k] == 0 && noBlockLR(i,k,j,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockLR(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}

function moveUp() {
    if (!cantMoveUp(board)){
        return false;
    }
    for (var j=0;j<4;j++){
        for (var i=1;i<4;i++){
            if (board[i][j]!=0){
                for (var k=0;k<i;k++){
                    if (board[k][j] ==0 && noBlockTD(j,k,i,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockTD(j,k,i,board)){
                        showMoveAnimation(i,j,i,k);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}

function moveRight() {
    if (!cantMoveRight(board)){
        return false;
    }
    for (var i=0;i<4;i++){
        for (var j=2;j>=0;j--) {
            if (board[i][j]!=0 ){
                for (var k=3;k>j;k--){
                    if (board[i][k] == 0 && noBlockLR(i,j,k,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockLR(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}

function moveDown() {
    if (!cantMoveDown(board)){
        return false;
    }
    for (var j=0;j<4;j++){
        for (var i=2;i>=0;i--){
            if (board[i][j]!=0){
                for (var k=3;k>i;k--){
                    if (board[k][j] ==0 && noBlockTD(j,i,k,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockTD(j,i,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}

