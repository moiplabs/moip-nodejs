#retirado de http://gist.github.com/579814
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install
curl http://npmjs.org/install.sh | sh

### instalando as dependências do exemplo do MoIP

npm install xml2js
npm install request

echo Tudo pronto. Agora execute "node moip.js" para testar o nosso script de integração.
