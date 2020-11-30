const clsObjSetData = require('../dbsource/dbsource.js');
const clsObjBnsManagementRul = require('./bnsManagementRul.js');

class bnsIndex{
   
    async principalBnsIndex(requestUser){
         
        let objSetData = new clsObjSetData();
        let objClsBnsManagementRul = new clsObjBnsManagementRul();
        let resultOper = null;
        let resultOperValidate = null;
        let RowAffectedtId = "";
        let messajeReturn = null;
        let resultArray= null;
        let rtaValidate = null;
         
        try{
            
            switch(requestUser.viOperation)
            {
                case "0":   resultOper = await Promise.all([objSetData.dbSetOperationNewRul()])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                            resultArray = Object.values(JSON.parse(JSON.stringify(resultOper)));
                            if(resultArray[0].hasOwnProperty('insertId'))
                            {RowAffectedtId =  resultArray[0].insertId.toString(); 
                            messajeReturn = "{'insertId'  : "+ RowAffectedtId +"}";}
                            break;
                case "1":   resultOper = await Promise.all([objSetData.dbGetOperationGetRulById(requestUser.viIdRo)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                            messajeReturn = Object.values(JSON.parse(JSON.stringify(resultOper)));
                            messajeReturn = messajeReturn[0];
                            break;
                case "2":   resultOper = await Promise.all([objSetData.dbSetStateOperationGetRulById(requestUser.viIdRo)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                            resultArray = Object.values(JSON.parse(JSON.stringify(resultOper)));
                            if(resultArray[0].hasOwnProperty('affectedRows'))
                            {RowAffectedtId =  resultArray[0].affectedRows.toString(); 
                            messajeReturn = "{'affectedRows'  : "+ RowAffectedtId +"}";}
                            break;
                case "3":  resultOperValidate = await Promise.all([objClsBnsManagementRul.clsManagementRulTypeOp(requestUser)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                            rtaValidate = resultOperValidate[0][0].filter(element => element === "false");
                            
                            if(rtaValidate[0] === "false")
                            {messajeReturn = "{'Error'  : 'The parameters sent do not satisfy the options to participate'}";}
                            else
                            {
                                resultOper = await Promise.all([objSetData.dbSetOperationRul(requestUser)])
                                .then((result)=>{return result})
                                .catch(error=>{(error, null)});
                                
                                messajeReturn = Object.values(JSON.parse(JSON.stringify(resultOper[0])));
                                
                                if (messajeReturn[0][0].hasOwnProperty('RESULT')) {
                                    if(messajeReturn[0][0].RESULT.toString() === "1")
                                        messajeReturn = "{'Result'  : 'Successful Participation.', 'Value' : '1'}";
                                    else
                                        messajeReturn = "{'Result'  : 'This participation is not accepted, there may not be quotas or the value of the allowed amount is exceeded.', 'Value ' : '-1' }";
                                }
                            }
                            break;
                case "4":   resultOper = await Promise.all([objSetData.dbGetOperationGetDataRulById(requestUser.viIdRo)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                            resultArray = Object.values(JSON.parse(JSON.stringify(resultOper)));

                            messajeReturn = resultArray;
                            break;
            }
        }catch(e){
            messajeReturn = "{'Error'  : 'No records were found to process.'}";
        }
        return messajeReturn;
     }
}
module.exports = bnsIndex;