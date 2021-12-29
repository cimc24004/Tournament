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
    return true;
  }else{
    return false;
  }
}

function ContentsRemove(boxId){
  contents_data.forEach((target, index) => {
    if(boxId == target.id){
      contents_data.splice(index, 1);
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
    border_data: {
      width_up: {
        x_end: positionX + width,
        y_end: positionY,
        x_start: positionX,
        y_start: positionY
      },
      width_down: {
        x_end: positionX + width,
        y_end: positionY + height,
        x_start: positionX,
        y_start: positionY + height
      },
      height_right: {
        x_end: positionX + width,
        y_end: positionY + height,
        x_start: positionX + width,
        y_start: positionY
      },
      height_left: {
        x_end: positionX,
        y_end: positionY + height,
        x_start: positionX,
        y_start: positionY
      }
    }
  });


}
function ConnectRelationShipOnMouse(connect_relation_data, point, x = null, y = null){
  if(point != null){
    if((connect_relation_data.x + connect_relation_data.width - 1 >= point.x &&
      connect_relation_data.x + 1 <= point.x &&
      (connect_relation_data.y + connect_relation_data.height - 1 >= point.y)
      && connect_relation_data.y + 1 <= point.y)){
        return true;
    }else{
      return false;
    }
  }else{
    if((connect_relation_data.x + connect_relation_data.width >= x &&
      connect_relation_data.x <= x &&
      (connect_relation_data.y + connect_relation_data.height >= y)
      && connect_relation_data.y <= y)){
      return true;
    }else{
      return false;
    }
  }
}
function ConnectRelationShipGetByOriginId(id, mode = "origin"){
  connect_relationship.forEach((connect_relation) => {
    if(mode == "origin"){
      if(connect_relation.origin_id == id){
        return connect_relation;
      }
    }else if(mode == "target"){
      if(connect_relation.target_id == id){
        return connect_relation;
      }
    }
  });
}
function BorderDataOfContentsGetByDirectionName(target_contents, direction_name){
  if(direction_name == "width_up"){
    return target_contents.border_data.width_up;
  }else if(direction_name == "width_down"){
    return target_contents.border_data.width_down;

  }else if(direction_name == "height_right"){
    return target_contents.border_data.height_right;

  }else if(direction_name == "height_left"){
    return target_contents.border_data.height_left;
  }
}

function ArrowStartDurationInBoxClickCheck(target_contents_data, point, permit_border_click_range = 10){
  //x, y
  let width_up_data = {x_end: target_contents_data.positionX + target_contents_data.width, y_end: target_contents_data.positionY, x_start: target_contents_data.positionX, y_start: target_contents_data.positionY + permit_border_click_range};
  let width_down_data = {x_end: target_contents_data.positionX + target_contents_data.width, y_end: target_contents_data.positionY + target_contents_data.height, x_start: target_contents_data.positionX, y_start: target_contents_data.positionY + target_contents_data.height - permit_border_click_range};
  
  let height_right_data = {x_end: target_contents_data.positionX + target_contents_data.width, y_end: target_contents_data.positionY + target_contents_data.height, x_start: target_contents_data.positionX + target_contents_data.width - permit_border_click_range, y_start: target_contents_data.positionY};
  let height_left_data = {x_end: target_contents_data.positionX, y_end: target_contents_data.positionY + target_contents_data.height, x_start: target_contents_data.positionX + permit_border_click_range, y_start: target_contents_data.positionY}
  if(width_up_data.x_end >= point.x && width_up_data.x_start <= point.x && width_up_data.y_end <= point.y  && width_up_data.y_start >= point.y){
    return {direction: "width_up", data_get: width_up_data};
  }else if(width_down_data.x_end >= point.x && width_down_data.x_start <= point.x && width_down_data.y_end >= point.y && width_down_data.y_start <= point.y){
      return {direction: "width_down", data_get: width_down_data};
  }else if(height_right_data.x_end >= point.x, height_right_data.x_start <= point.x && height_right_data.y_end >= point.y && height_right_data.y_start <= point.y){
      return {direction: "height_right", data_get: height_right_data};
  }else if(height_left_data.x_end >= point.x, height_left_data.x_start >= point.x && height_left_data.y_end >= point.y && height_left_data.y_start <= point.y){
      return {direction: "height_left", data_get: height_left_data};
  }
  return {direction: undefined, data_get: null};
}
function NumberDirectionGetByDirectionName(direction_name){
  if(direction_name == "width_up"){
    return {x: null, y: -1};
  }else if(direction_name == "width_down"){
    return {x: null, y: 1};
  }else if(direction_name == "height_left"){
    return {x: -1, y: null};
  }else if(direction_name == "height_right"){
    return {x: 1, y: null};
  }
}
function ConnectLineAdd(Id,OriginId, TargetId, mode="box", start_direction, target_direction, direction_x, direction_y){
  connect_line_data_index += 1;
  debugger;
  connect_line_data.push({
    id: Id,
    start_id: OriginId,
    target_id: TargetId,
    mode: mode,
    start_direction: start_direction,
    target_direction: target_direction,
    direction_x: direction_x,
    direction_y: direction_y
  });
}

function ConnectLineRemove(boxId){
  connect_line_data.forEach((connect_line_one, index) => {
    if(connect_line_one.id == boxId){
      connect_line_one.splice(index, 1);
    }
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

function ConnectLineDataGetById(target_id){
  let connect_line_data_target = null;
  connect_line_data.forEach((connect_line_data_one) => {
    if(connect_line_data_one.id == target_id){
      connect_line_data_target =  connect_line_data_one;
    }
  })
  return connect_line_data_target;
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
