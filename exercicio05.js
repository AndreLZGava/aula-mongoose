var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/pos_unoesc');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Erro de conexao ', err);	
});
db.on('opne', function(err){
	console.log('Conexão Aberta. ');	
});
db.on('connected', function(err){
	console.log('Conectado');	
});
db.on('disconnected', function(err){
	console.log('Disconectado');	
});

var Schema = mongoose.Schema;

var json_schema={
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	price: {type: Number, min: 0},
	category: {type: String, default: ''},
	created_at: {type: Date, default: Date.now},
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema), query = { name: /skol/i};


var mod ={
	name: 'Brahma',
	alcohol:4,
	price: 6,
	category: 'pilsen'
};

var optional= {
	upsert: false,
	multi: true
};

Beer.update(query, mod, optional, function(err, data){
	if(err){
		console.log('Erro: ', err);
	}else{
		console.log('Cerveja atualizada com sucesso: ', data);
	}
	process.exit(0);
});




