function ContentsMove(boxId, targetMovePositionX, targetMovePositionY, width, height){
  if(dragging_contents_data.fixed == false){
    ContentsRemove(boxId);
    ContentsAdd(boxId, targetMovePositionX, targetMovePositionY, width, height);
  }
  dragging_contents_data = ContentsDataGetById(boxId);
}

function ContentsMaxMinAdmit({currentPositionX, currentPositionY, MaxPositionX, MaxPositionY, MinPositionX, MinPositionY}){
  if(currentPositionX >= MinPositionX && currentPositionX <= MaxPositionX && currentPositionY >= MinPositionY && currentPositionY <= MaxPositionY){
    console.log("-----------------")
    return true;
  }else{
    return false;
  }
}

function ContentsRemove(boxId){
  contents_data.forEach((target, index) => {
    if(boxId == target.id){
      contents_data.splice(index,1);
    }
  });
}

function ContentsAdd(boxId, positionX, positionY, width = 0, height = 0, mode = "stroke", fixed = false, image_src = null, fillStyle = null, text = ""){
  contents_index += 1;
  contents_data.push({
    id: boxId,
    positionX: positionX,
    positionY: positionY,
    width: width,
    height: height,
    mode: mode,
    fixed: fixed,
    image: image_src,
    fillStyle: fillStyle,
    text: text
  });
}

function ContentsDataGetById(target_id){
  let contents_data_target = null;
  contents_data.forEach((contents_data_one) => {
    if(contents_data_one.id == target_id){
      contents_data_target =  contents_data_one;
    }
  })
  return contents_data_target
}
function ImageDraw(img_path, positionX, positionY, width, height){
  var img = new Image();
  img.src = img_path;
  img.onload = function(event){
    // ctx.drawImage(img, positionX, positionY, width, height);
    console.log("描画されろ―――");
    // debugger;
  }
}
function ContentsOnClickCheck(contents_data, point){

  if((contents_data.positionX + contents_data.width >= point.x &&
  contents_data.positionX <= point.x &&
  (contents_data.positionY + contents_data.height >= point.y)
  && contents_data.positionY <= point.y)){
    return true;
  }else{
    return false;
  }

}
