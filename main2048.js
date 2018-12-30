var board =new Array();
var score = 0;

$(document).ready(function(){
  //初始化棋盘
  init();

  //随机生成2个格子
  generateOneNumber();
  generateOneNumber();
})

function init(){
  for(var i=0;i<4;++i)
      for(var j=0;j<4;++j){

        var gridcell=$("#grid-cell-"+i+"-"+j);
        gridcell.css("top",getPosTop(i,j));
        gridcell.css("left",getPosLeft(i,j));
  }

  for(var i=0;i<4;++i){
    board[i]=new Array();
    for(var j=0;j<4;++j)
      board[i][j]=0;
  }

  updateBoardView();
}

function updateBoardView(){
  $(".number-cell").remove();
  for(var i=0;i<4;++i)
    for(var j=0;j<4;++j){
      $("#grid-container").append('<div class="number-cell" id='+"number-cell-"+i+"-"+j+'></div>');
      var theNumberCell=$("#number-cell-"+i+"-"+j);

      if(board[i][j]==0){
        theNumberCell.css("height","0px");
        theNumberCell.css("width","0px");
        theNumberCell.css("top",getPosTop(i,j)+50);
        theNumberCell.css("left",getPosLeft(i,j)+50);
      }
      else {
        theNumberCell.css('height','100px');
        theNumberCell.css('width','100px');
        theNumberCell.css('top',getPosTop(i,j));
        theNumberCell.css('left',getPosLeft(i,j));
        theNumberCell.text(board[i][j]);
      }

      theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
      theNumberCell.css('color',getNumberColor(board[i][j]));
    }
}

function generateOneNumber(){
  if(nospace(board))
    return false;


  //随机选择一个位置
  var randX=parseInt(Math.floor(Math.random()*4));
  var randY=parseInt(Math.floor(Math.random()*4));
  while(true){
    if(board[randX][randY]==0)
      break;

    randX=parseInt(Math.floor(Math.random()*4));
    randY=parseInt(Math.floor(Math.random()*4));
  }
  //随机生成一个数字
  randNumber=Math.random()<0.5?2:4;
  //在UI中显示数字
  board[randX][randY]=randNumber;
  showNumberWithAnimation(randX,randY,randNumber);
  return true;
}

function newgame(){
  init();
  generateOneNumber();
  generateOneNumber();
}

$(document).keydown(function(event) {
  /* Act on the event */
  switch (event.keyCode) {
    case 37://left
      if(moveLeft()){
        generateOneNumber();
        isOver();
      }
      break;

    case 38://up
      if(moveUp()){
        generateOneNumber();
        isOver();
      }
      break;

    case 39://right
      if(moveRight()){
        generateOneNumber();
        isOver();
      }
      break;

    case 40://down
      if(mvoeDown()){
        generateOneNumber();
        isOver();
      }
      break;
    default:
      break;
  }
});

function moveLeft(){
  if(!canMoveLeft(board))
    return false;

  //moveLeft
  for(var i=0;i<4;++i)
    for(var j=1;j<4;++j){
      /*
        0、判断从第j列一直判断到j-1列
        1、左侧与当前相等，可以移动，进行加操作
        2、左侧为空，可以移动
      */

      if(board[i][j]!=0){
        for(var k=0;k<j;++k){
          if(board[i][k]==0&&noBlock(board,i,j,k))
          {
            //move
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][j];
            board[i][j]=0;
          }

          else if(board[i][k]==board[i][j]&&noBlock(board,i,j,k))
          {
            //move add
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][k]+board[i][j];
            board[i][j]=0;
          }
          else
            continue;
        }
        setTimeout("updateBoardView()",200);
      }
    }
  return true;
}
