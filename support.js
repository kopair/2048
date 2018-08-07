function getPosTop(i,j) {
    return 20+i*120;
}
function getPosLeft(i,j) {
    return 20+j*120;
}
function getUmberBackgroundColor(number) {
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8193:return "#93c";break;

    }
    return "block";
}
function getNumberColor(number) {
    if (number<=4){
        return "#776e65";
    }
    return "white";
}
// 生成随机数
function showNumberWithAnimetion(i ,j ,randNumber) {
    var numberCell=$('#number-'+i+'-'+j);

    numberCell.css('background-color',getUmberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200);
}
function nospace(board) {
    for (var i =0;i<4;i++){
        for (var j=0;j<4;j++){
            if (board[i][j]==0)
                return false;
        }
    }
    return true;
}
function cantMoveLeft(board) {
    for (var i =0;i<4;i++){
        for (var j=1;j<4;j++){
            if (board[i][j] != 0) {
                if (board[i][j-1]==0||board[i][j-1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function cantMoveUp(board) {
    for (var j=0;j<4;j++){
        for (var i=1;i<4;i++){
            if (board[i][j] != 0) {
                if (board[i-1][j]==0||board[i-1][j] == board[i][j])
                    return true;
            }
        }
    }
}

function cantMoveRight(board) {
    for (var i =0;i<4;i++){
        for (var j=2;j>=0;j--){
            if (board[i][j] != 0) {
                if (board[i][j+1]==0||board[i][j+1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function cantMoveDown(board) {
    for (var j=0;j<4;j++){
        for (var i=2;i>=0;i--){
            if (board[i][j] != 0) {
                if (board[i+1][j]==0||board[i+1][j] == board[i][j])
                    return true;
            }
        }
    }
}




function noBlockLR(row,col1,col2,board) {
    for (var i=col1+1;i<col2;i++){
        if (board[row][i] != 0)
            return false;
    }
    return true;
}

function noBlockTD(col,row1,row2,board) {
    for (var i=row1+1;i<row2;i++){
        if (board[i][col] != 0)
            return false;
    }
    return true;
}

function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell =$('#number-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },3000);
}

function nomove(board) {
    if (cantMoveDown(board) ||
        cantMoveUp(board)||
        cantMoveLeft(board)||
        cantMoveRight(board))
        return false;

    return true;
}


