function getTData(){

}

function concatToArray(arrayTo: Array<Array<string>>|Array<any>, arrayFrom: Array<Array<string>>){

    if(arrayTo.length == 0)
    {
        return arrayFrom;
    } else {
        return arrayTo.map((row, i) => {
            try{
              return [...row, ...arrayFrom[i]]
            } catch(e) {
              Logger.log(e);
              Logger.log(arrayFrom[i]);
              return [...row, 'error'];
            }
          });
    }

}

function findIndex(array: Array<string>, value: any){

    for(let i = 0; i < array.length; i++)
    {
        if(array.indexOf(value) >= 0)
        {
            return i;
        }    
    }

    return -1;
}