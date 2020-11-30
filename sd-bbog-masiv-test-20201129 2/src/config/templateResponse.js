const templateResponse = (message, status, body) =>{
    return   {
       "message":  message,
       "status":   status,
       "body":     body 
   };
};

module.exports = templateResponse;