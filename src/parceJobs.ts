function getJobData(){

    if(!mainTRawJobSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }
    
    return mainTRawJobSheet.getRange(2, 1, mainTRawJobSheet.getLastRow() - 1, 3).getValues()
    .map(row => [row[0], row[1], row[2], '', '', '', '', '', '', '', '']);

}
  
function watchRawData(){
  clearSheet(mainRawDataSheet);
  let array = getJobData();
  mainRawDataSheet?.getRange(2, 1, array.length, array[0].length).setValues(array);
}
  
function buildStairs() {

  clearSheet(mainTJobSheet);

  let array = getJobData();

  let shiftNum = 1;

  do{
    array = shift(array, shiftNum);    
    shiftNum += 2;
  } while(shiftNum < 8)  

  backComplanation(array, 9);
  backComplanation(array, 7);
  backComplanation(array, 5);
  backComplanation(array, 3);

  fillDown(array, 1);

  fillSpaces(array, 5);
  fillSpaces(array, 7);

  if(!mainTJobSheet)
  {
    throw Error('mainTJobSheet!');
  }

  array.map(row => {
    if(row[9]){
      let temp = row[9].split(".");
      
      while(temp.length < 7){
        temp.push('1');
      }

      row[9] = temp.join(".");
    }
  });

  array = array.filter(e=>e[9]).map(row => [...row, `${row[9]} ${row[10]}`])

  mainTJobSheet.getRange(2, 1, array.length, array[0].length).setValues(array);

}

function shift(array: Array<Array<string>>, shift = 0){
  for(let i = 0; i < array.length; i++)
  {
    let headCode = array[i][shift + 0].slice();
    let headName = array[i][shift + 1].slice();

    if(exeptionCodes.indexOf(headCode)>=0){continue};

    if(!headCode){continue}
    
    for(let j = i + 1; j < array.length; j++)
    {    
      let compValue = array[j][shift + 0];
      if(compValue.indexOf(headCode)>-1)
      {
        array[j][shift + 2] = array[j][shift + 0].slice();
        array[j][shift + 3] = array[j][shift + 1].slice();
        array[j][shift + 0] = '';
        array[j][shift + 1] = '';
      }
    }
  }
  return array;
}

function fillDown(array: Array<Array<string>>, shift = 0){
  for(let i = 0; i < array.length; i++)
  {
    let headName = array[i][shift + 0]
    if(!headName){continue}
    for(let j = i + 1; j < array.length; j++)
    {    
      let compValue = array[j][shift + 0];      
      if(!compValue){
        array[j][shift] = array[i][shift].slice();
        array[j][shift+1] = array[i][shift+1].slice();
      } else {
        i = j;
        continue;
      }      
    }
  }
  return array;
}

function fillDownSpecial(array: Array<Array<string>>, shift = 0){
  for(let i = 0; i < array.length; i++)
  {   
    if(array[i][shift] && array[i+1][shift])
    {
      array[i][shift+2] = array[i][shift];
      array[i][shift+3] = array[i][shift+1];
    }
  }
  return array;
}


function backComplanation(array: Array<Array<string>>, shift = 0){

  for(let i = 0; i < array.length; i++)
  {
    if(array[i][shift])
    {
      for(let j = i; j > 0; j--)
      {    
        if(array[j][shift-2])
        {
          array[i][shift-2] = array[j][shift-2];
          array[i][shift-1] = array[j][shift-1];
          break;
        }
      }
    }
  }
  return array;

}


function fillSpaces(array: Array<Array<string>>, shift = 0){
  for(let i = 0; i < array.length; i++)
  {  
    if(array[i][shift] && !array[i][shift+2])
    {
      array[i][shift+2] = array[i][shift];
      array[i][shift+3] = array[i][shift+1];
    }
  }
  return array;
}

  
  
  
  
  
  