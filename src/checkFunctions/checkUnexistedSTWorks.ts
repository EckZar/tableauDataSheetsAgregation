function getUnexistedSTWorks(){
   
    if(!mainSTDataGroupSheet)
    {
        throw Error('mainSTDataGroupSheet lost!!!')
    }

    let stRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, 1).getValues();

    if(!mainTJobSheet)
    {
        throw Error('mainTJobSheet lost!!!')
    }

    let tRange = mainTJobSheet.getRange(2, 12, mainTJobSheet.getLastRow() - 1, 1).getValues();

    let arr = [['Работа']];

    let jobs = [];

    for(let i = 0; i < stRange.length; i++)
    {
        let range = tRange.filter(row => row[0] == stRange[i][0]);                          
        
        if(range.length == 0){
            jobs.push(stRange[i][0]);
        }
    }    

    jobs = jobs.filter(e => e != '');

    let uniq = [...new Set(jobs)];

    uniq = uniq.map(job => [job]);

    return [...arr, ...uniq];


}

function pasteUnexistedSTWorks(){

    if(!mainCheckListSheet)
    {
        throw Error('mainCheckListSheet lost!!!')
    }   

    let arr = getUnexistedSTWorks();

    clearSheet(mainCheckListSheet, 1);

    mainCheckListSheet.getRange(1, 1, arr.length, arr[0].length).setValues(arr);

}