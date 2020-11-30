const clsObjMysqlConnection  =  require('../config/configdb.js');

class clsDbSource{

    constructor(){
        this.messageConnection = 'Error: connection undefined clsDistributionData';
    }

    async dbSetOperationNewRul(){
        
        const conexion = new clsObjMysqlConnection();
        await conexion.getCredentials();

        return new Promise((resolve, reject)=>{

            let objSql;
            objSql = "INSERT INTO SD_MASTER_RUL (STATE) VALUES ('1'); ";
            conexion.getConn().then(function(conn){
                let connection = conn;
                let result = connection.query(objSql);
                conn.end();
                return resolve(result);
            });
        });
    }
    
    
    async dbGetOperationGetRulById(idRul){
        
        const conexion = new clsObjMysqlConnection();
        await conexion.getCredentials();

        return new Promise((resolve, reject)=>{

            let objSql;
            objSql = "SELECT ID,STATE FROM SD_MASTER_RUL WHERE ID ="+ idRul+";";
            conexion.getConn().then(function(conn){
                let connection = conn;
                let result = connection.query(objSql);
                conn.end();
                return resolve(result);
            });
        });
    }

    async dbSetStateOperationGetRulById(idRul){
        
        const conexion = new clsObjMysqlConnection();
        await conexion.getCredentials();

        return new Promise((resolve, reject)=>{

            let objSql;
            objSql = "UPDATE SD_MASTER_RUL SET STATE = 0 WHERE ID ="+ idRul+";";
            conexion.getConn().then(function(conn){
                let connection = conn;
                let result = connection.query(objSql);
                conn.end();
                return resolve(result);
            });
        });
    }
    
    async dbSetOperationRul(requestUser){
        
        const conexion = new clsObjMysqlConnection();
        await conexion.getCredentials();

        return new Promise((resolve, reject)=>{

            let objSql;
            objSql = "CALL SP_INS_SD_RUL_BSN('"+ requestUser.viIdRo +"','"+ requestUser.viIdenUs +"','"+ requestUser.viTypeElec +"','"+ requestUser.viValueTypeElec +"','"+requestUser.viValueQuantity+"');";
            console.log(objSql);
            conexion.getConn().then(function(conn){
                let connection = conn;
                let result = connection.query(objSql);
                conn.end();
                return resolve(result);
            });
        });
    }
    
    async dbGetOperationGetDataRulById(idRul){
        
        const conexion = new clsObjMysqlConnection();
        await conexion.getCredentials();

        return new Promise((resolve, reject)=>{

            let objSql;
            objSql = "SELECT A.ID,A.STATE,B.IDUSER,B.VALUETYPEELEC,VALUEOPTION,B.CREATED_AT FROM SD_MASTER_RUL A INNER JOIN SD_MASTER_RUL_BSN B ON (B.IDRUL = A.ID) WHERE A.ID = "+ idRul +";";
            conexion.getConn().then(function(conn){
                let connection = conn;
                let result = connection.query(objSql);
                conn.end();
                return resolve(result);
            });
        });
    }
}
module.exports = clsDbSource;
