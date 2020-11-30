//conexion a base de datos
var mysql = require('promise-mysql');
const CallSecretManager = require('./secretManager.js');

class Conexion{
  
    hostName;
    userName;
    password;
    database;
    port;
    vOptionOrigin;
    
  constructor(){}
  
  async getCredentials(){
        
        this.vOptionOrigin = process.env.vOptionOrigin;
        let secret;
        let vSecret;
        
        switch(this.vOptionOrigin)
        {
            case "0":
                let objCallSecretManager = new CallSecretManager();
                secret = objCallSecretManager.secretManager(await Promise.all([objCallSecretManager.getSecretV()])
                          .then((result) =>{return result}));
                secret = JSON.parse(secret);
                this.hostName = secret.veHost;
                this.userName = secret.veUser;
                this.password = secret.vePassword;
                this.database = secret.veDatabase;
                this.port = secret.vePort;
                break;
        }
    }

   getConn(){
    return  mysql.createConnection({
      host: this.hostName,
      user: this.userName,
      password: this.password,
      database: this.database,
      port: this.port
    });
  }
}
module.exports = Conexion;
