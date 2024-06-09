var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'animepage',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXISTOSA');
    }
});

connection.query('SELECT * FROM usuarios', function(error, results, fields){
    if(error){
        throw error;
    }else if (results) {
        results.forEach(result => {
            console.log(result);
        });
    } else {
        console.log('No se encontraron resultados.');
    }
});

connection.end();
