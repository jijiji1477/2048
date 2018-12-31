function showNumberWithAnimation(i,j,number){
  theNumberCell=$("#number-cell-"+i+"-"+j);
  theNumberCell.css('background-color',getNumberBackgroundColor(number));
  theNumberCell.css('color',getNumberColor(number));
  theNumberCell.text(number);

  theNumberCell.animate({
    width: '100px',
    height: '100px',
    top:getPosTop(i,j),
    left:getPosLeft(i,j)
  },100)
};

function showMoveAnimation(srcX,srcY,dirX,dirY){
  theNumberCell=$("#number-cell-"+srcX+"-"+srcY);
  theNumberCell.animate({
    top: getPosTop(dirX,dirY),
    left: getPosLeft(dirX,dirY)}, 200)
};

function updateScore(score){
  theScoreCell=$("#score");
  theScoreCell.text(score);
  theScoreCell.css('color','orange');
  theScoreCell.animate({fontSize: '60px'}, 100);
  theScoreCell.animate({fontSize: '25px'}, 100);
  setTimeout('updateScoreColor()',200);
  // theScoreCell.css('color','black');
};

function updateScoreColor(){
  theScoreCell=$("#score");
  theScoreCell.css('color', 'black');
}
