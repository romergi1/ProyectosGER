
const clsObjSetData = require('./src/bussines/bnsIndex.js');
const response =   require('./src/config/templateResponse.js');
const httpStatus =   require('./src/config/httpStatus.js');
const RequestUser =   require('./src/models/requestUsers.js');

exports.handler = async (event, context, callback) => 
{
    
    context.callbackWaitsForEmptyEventLoop = false;
    let requestUser =  RequestUser.requestUser(event);
    
       try {
            let objSetData = new clsObjSetData();
            let resultdb = await objSetData.principalBnsIndex(requestUser);
            
            switch(requestUser.viOperation)
            {
                case "0":   resultdb = resultdb.replace('"{','{').replace('}"','}');
                            resultdb = resultdb.replace(/'/g, '"');
                            callback(null, response("OK", httpStatus.OK, JSON.parse(resultdb)));
                            break;
                case "1":   callback(null, response("OK", httpStatus.OK,resultdb[0]));
                            break;
                case "2":   resultdb = resultdb.replace('"{','{').replace('}"','}');
                            resultdb = resultdb.replace(/'/g, '"');
                            callback(null, response("OK", httpStatus.OK, JSON.parse(resultdb)));
                            break;
                case "3":   resultdb = resultdb.replace('"{','{').replace('}"','}');
                            resultdb = resultdb.replace(/'/g, '"');
                            callback(null, response("OK", httpStatus.OK, JSON.parse(resultdb)));
                            break;
                case "4":   callback(null, response("OK", httpStatus.OK,resultdb));
                            break;
            }
            
        } catch (e) 
        {
         callback("Error in the processing to bring the data. " + e, null);
        }
 };
 