function ContentsMove(boxId, targetMovePositionX, targetMovePositionY, width, height){
  if(dragging_contents_data.fixed == false){
    ContentsRemove(boxId);
    if(dragging_contents_data.image != null){
      ContentsAdd(boxId, targetMovePositionX, targetMovePositionY, width, height, dragging_contents_data.mode, dragging_contents_data.fixed, dragging_contents_data.image.image_src, dragging_contents_data.fillStyle, dragging_contents_data.text, dragging_contents_data.children);
    }else{
      ContentsAdd(boxId, targetMovePositionX, targetMovePositionY, width, height, dragging_contents_data.mode, dragging_contents_data.fixed, dragging_contents_data.image, dragging_contents_data.fillStyle, dragging_contents_data.text, dragging_contents_data.children);
    }
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

function ContentsAdd(boxId, positionX, positionY, width = 0, height = 0, mode = "stroke", fixed = false, image_src = null, style = "#000", text = "", children = [], font_size = null){
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
    style: style,
    text: text,
    font_size: font_size,
    children: children,
  });


}



function ContentsDataGetById(target_id){
  let contents_data_target = null;
  contents_data.forEach((contents_data_one) => {
    if(contents_data_one.id == target_id){
      contents_data_target =  contents_data_one;
    }
  })
  return contents_data_target;
}
function ContentsDataOverWrite(target_id, data){
  contents_data.forEach((contents_data_one) => {
    if(contents_data_one.id == target_id){
      contents_data_one = data;
    }
  })
}
function TextDataGetById(target_id){
  let text_data_target = null;
  text_data.forEach((text_data_one) => {
    if(text_data_one.id == target_id){
      text_data_target =  contents_data_one;
    }
  })
  return text_data_target;
}


function ctxFillText(text, fontSize, textX, textY, fontStyle, fontFamily) {
  ctx.font = (
    fontStyle ? fontStyle : 'normal') + ' ' +
    fontSize + 'px ' +
    (fontFamily ? fontFamily : 'sans-serif')
  ctx.fillText(
    text,
    textX === 'center' ?
      (ctxWidth - ctx.measureText(text).width) / 2 :
      textX === 'right' ?
        ctxWidth - ctx.measureText(text).width:
        textX && textX !== 'left' ? textX : 0,
    textY === 'center' ?
      (ctxHeight + fontSize / 2) / 2 :
        textY === 'bottom' ?
          ctxHeight - fontSize / 4 :
          textY && textY !== 'top' ? textY : fontSize
  )
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
function ContentsOnClickCheck(contents_data, point = null, x = 0, y = 0){
  if(point != null){
    if((contents_data.positionX + contents_data.width >= point.x &&
      contents_data.positionX <= point.x &&
      (contents_data.positionY + contents_data.height >= point.y)
      && contents_data.positionY <= point.y)){
        return true;
    }else{
      return false;
    }
  }else{
    if((contents_data.positionX + contents_data.width >= x &&
      contents_data.positionX <= x &&
      (contents_data.positionY + contents_data.height >= y)
      && contents_data.positionY <= y)){
      return true;
    }else{
      return false;
    }
  }


}
