var AWS = require('aws-sdk');
  
class CallSecretManager{

constructor(){
    this.region = "us-east-1";
    this.secretName = process.env.secretDBName;
    this.decodedBinarySecret = "";
    this.client = new AWS.SecretsManager({region: this.region});
}

getSecretV(){
    return new Promise((resolve, reject)=>{
        this.client.getSecretValue({SecretId: this.secretName}, function(err, data) {
            if (err) {
                console.log("Error obteniendo el secreto");
                reject(err);
            }else {
                console.log("Secreto OK");
                resolve(data);
            }
        });
    });
}

secretManager(secretValue){
    secretValue = secretValue[0];
    if ('SecretString' in secretValue) {
        return(secretValue.SecretString);
    } else {
        let buff = new Buffer(secretValue.SecretBinary);
        this.decodedBinarySecret = buff.toString('ascii');
        return(this.decodedBinarySecret);
    }
}
}
module.exports = CallSecretManager;