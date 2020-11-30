
class clsUtilRul{
   
    async UtilValidateNumber(requestUser){
       
        let arrVaResultOperValidate = [];
       
        if (!isNaN(requestUser.viValueTypeElec)) {
            if(requestUser.viValueTypeElec >=0 && requestUser.viValueTypeElec <=36)
            {
                arrVaResultOperValidate.push(1);
                
                if (requestUser.viValueTypeElec % 2 == 0)
                    arrVaResultOperValidate.push("RED");
                else
                    arrVaResultOperValidate.push("BLACK");
            }
            else
            {
                arrVaResultOperValidate.push(2);
                arrVaResultOperValidate.push("false");
            }
        }
        else
        {
            arrVaResultOperValidate.push(0);
            arrVaResultOperValidate.push("false");
        }
        
        return arrVaResultOperValidate;
    }
    
    async UtilValidateOption(requestUser){
       
        let arrVaResultOperValidate = [];
        
        if(requestUser.viValueTypeElec === "RED"|| requestUser.viValueTypeElec === "BLACK")
        {
            arrVaResultOperValidate.push(9);
            arrVaResultOperValidate.push(requestUser.viValueTypeElec);
            arrVaResultOperValidate.push("true");
        }
        return arrVaResultOperValidate;
    }
}
module.exports = clsUtilRul;