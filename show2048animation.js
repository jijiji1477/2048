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
