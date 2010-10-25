var request = require('request');
var sys = require('sys');
var xml2js = require('xml2js');


// XML de instrução
var xml = "<EnviarInstrucao> \
     <InstrucaoUnica> \
          <Razao>Teste</Razao> \
          <IdProprio>123456</IdProprio> \
          <Valores> \
            <Valor moeda='BRL'>150</Valor> \
          </Valores> \
     </InstrucaoUnica> \
</EnviarInstrucao>";

// Variáveis para autenticação
var token = "GTGP7V7RGO5K4ZJBO2BCTMYAUYEAINA1";
var key = "5IAQEXFKCELWQYUY0HKDNHMU0VCK7HGJHRUHQ58Y";
var auth = new Buffer(token+":"+key).toString('base64');
var headers = {"Authorization":"Basic "+auth,'User-Agent:':'Mozilla/4.0'};

// Efetua a requisição pro servidor do MoIP
request({uri:"https://desenvolvedor.moip.com.br/sandbox/ws/alpha/EnviarInstrucao/Unica",
        method:'POST',
        headers:headers,
        body:xml},
        
        function(error,response,body)
        {
        
            if(!error && response.statusCode==200)
            {
                var parser = new xml2js.Parser();
                parser.addListener('end',function(result){ 
                    
                    if (result.Resposta.Status=='Sucesso')
                    {
                        sys.puts('Transação efetuada com sucesso!');
                        sys.puts('Token: '+result.Resposta.Token);
                        sys.puts('ID: '+result.Resposta.ID)
                    }

                }); 
                
                sys.puts('Resposta do servidor: '+body)
                parser.parseString(body);
            }

        });
