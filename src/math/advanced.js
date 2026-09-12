export function rectangleArea(width,height){return Number(width)*Number(height);}
export function canPlacePiece(piece,placed,boardWidth,boardHeight){
  if(!piece||piece.w<=0||piece.h<=0)return false;
  if(piece.x<0||piece.y<0||piece.x+piece.w>boardWidth||piece.y+piece.h>boardHeight)return false;
  return !placed.some(other=>piece.x<other.x+other.w&&piece.x+piece.w>other.x&&piece.y<other.y+other.h&&piece.y+piece.h>other.y);
}
export function isBoardCovered(pieces,boardWidth,boardHeight){
  if(!Array.isArray(pieces)||pieces.reduce((sum,p)=>sum+rectangleArea(p.w,p.h),0)!==rectangleArea(boardWidth,boardHeight))return false;
  const accepted=[];
  for(const piece of pieces){if(!canPlacePiece(piece,accepted,boardWidth,boardHeight))return false;accepted.push(piece);}
  return true;
}
export function foldPaper(state,direction){
  const next={...state,history:[...(state.history||[])]};
  if(direction==='horizontal'){next.height/=2;}
  else if(direction==='vertical'){next.width/=2;}
  else return next;
  next.layers=(state.layers||1)*2;next.folds=(state.folds||0)+1;next.history.push(direction);return next;
}
export function candyFilterCount(candies,predicates=[]){return predicates.reduce((items,predicate)=>items.filter(predicate),[...candies]).length;}
export function gearValuesFromGcd(ratio,gcdValue){const min=Math.min(...ratio.filter(n=>n>0));const scale=Number(gcdValue)/min;return ratio.map(n=>n*scale);}
export function numberLineJumps(step,max){const result=[];for(let value=step;value<=max;value+=step)result.push(value);return result;}
