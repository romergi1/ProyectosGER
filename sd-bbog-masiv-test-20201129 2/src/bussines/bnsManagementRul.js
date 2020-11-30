
const objClsUtilRul =   require('../util/clsUtilRul.js');

class clsBnsManagementRul{
   
    async clsManagementRulTypeOp(requestUser){
        let objUtilRul = new objClsUtilRul();
        let resultOperValidate = null;
        
        switch(requestUser.viTypeElec)
        {
            case "0":   resultOperValidate = await Promise.all([objUtilRul.UtilValidateNumber(requestUser)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                        break;
            case "1":   resultOperValidate = await Promise.all([objUtilRul.UtilValidateOption(requestUser)])
                            .then((result)=>{return result})
                            .catch(error=>{(error, null)});
                        break;
            
        }
        
        return resultOperValidate;
    }
}
module.exports = clsBnsManagementRul;