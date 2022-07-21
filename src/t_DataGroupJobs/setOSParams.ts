function setOSParams(){

    if(!mainOSExeptionsSheet)
    {
      throw Error('mainOSExeptionsSheet Lost');
    }
    

    let osParams = mainOSExeptionsSheet.getRange(2, 1, mainOSExeptionsSheet.getLastRow() - 1, mainOSExeptionsSheet.getLastColumn()).getValues();

    if(!mainSTDataGroupSheet)
    {
      throw Error('agMainAgregationSheet Lost');
    }

    let dataGroupRange = mainSTDataGroupSheet.getRange(3, 1, mainSTDataGroupSheet.getLastRow() - 2, mainSTDataGroupSheet.getLastColumn())
                        .getValues()
                        .map(row => {
                            let fosParams = osParams.filter(e => compareTwoString(row[0], e[2]));

                            if(fosParams.length > 0)
                            {
                                let q = fosParams.filter(e => searchBySubString(row[1], e[4]));
                                
                                if(q.length > 0){
                                    row[10] = q[0][3];                                    
                                } else {
                                    row[10] = 'о';
                                }

                            } else {
                                row[10] = 'о';
                            }
                            return row;
                        });


    mainSTDataGroupSheet.getRange(3, 1, dataGroupRange.length, dataGroupRange[0].length).setValues(dataGroupRange);

}