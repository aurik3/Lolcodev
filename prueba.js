const Discord = require("discord.js");
const config = require('./config.json');
const client = new Discord.Client(); // instanciamos la clase Client para poder crear y emitir los eventos
//
const https = require('https');

const apiKey = 'RGAPI-1a019f41-e9fe-4359-a94b-d28a789feacb';
//const name = 'Neot';
//const url = 'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ name +'?api_key=' + apiKey;

var prefix = config.prefix;

//

client.on("ready", () => {
console.log("Anubis Ready")
});

client.on("message", (message1) => {
  if(message1.content.startsWith("rotacion")) {
    const apiKey = 'RGAPI-1a019f41-e9fe-4359-a94b-d28a789feacb';
    const url = 'https://la1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=' + apiKey;
    
    https.get(url, (resp) => {
      let data = '';
    
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        var toPaser = JSON.parse(data);
        var rotation = toPaser.freeChampionIds;
        //var level= toPaser.summonerLevel;
        var mensaje= 'La rotacion de campeones:'+rotation;
        //message2.channel.send(mensaje);
         
        






        
        message1.channel.send({embed: {
         color: 3447003,
         description: mensaje
       }
      });
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });













  }
});

client.on("message", (message2) => {
  if (!message2.content.startsWith(prefix) || message2.author.bot) return;

const args = message2.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();
    var sn = args;
    const url = 'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ sn +'?api_key=' + apiKey;
if (!args.length) {
      
  return message.channel.send(`Porfavor escribe tu nombre de invocador, ${message.author}!`);
}
  
    if(command == 'invocador'){
      
      https.get(url, (resp) => {
        let data = '';
          
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {

          //console.log('caca: ',JSON.stringify(data));
    
             var toPaser = JSON.parse(data);
             var name = toPaser.name;
             var level= toPaser.summonerLevel;
             var mensaje= 'tu nombre de invocador: '+name+' '+' tu level es: '+level;
             //message2.channel.send(mensaje);

             message2.channel.send({embed: {
              color: 3447003,
              description: mensaje
            }
        });
            
           
         });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });   
      
        //message2.channel.send(JSON.parse.data)
    } 
    
});

client.on("message", (message3)  => {
 
  if(message3.content.startsWith("radio")) {
 
    let voiceChannel = message3.member.voiceChannel;
    if(!voiceChannel) return message3.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        
    voiceChannel.join()
        .then(connection => {
           
        const dispatcher = connection.playStream('http://streamingp.shoutcast.com/hotmixradio-80-128.mp3');
        message3.channel.send('Reproduciendo');
           
    })
    .catch(console.error);
    


  }







});

client.on("message", (message5) => {
  if (!message5.content.startsWith(prefix) || message5.author.bot) return;
  const args = message5.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  if (!args.length) {
                
    return message5.channel.send(`Porfavor escribe tu nombre de invocador, ${message.author}!`);
  }

  var name = args;
  const url = 'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ name +'?api_key=' + apiKey;
  
  if(command == 'livegame'){
      
    https.get(url, (resp) => {
      let data = '';
     
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      
      resp.on('end', () => {

  
           var toPaser = JSON.parse(data);
           var ident = toPaser.id;

           console.log(ident);

           const livegame = 'https://la1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'+ ident+'?api_key=' + apiKey;
           
           console.log(livegame);
        https.get(livegame, (resp) => {
      let datas = '';

        // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
          datas += chunk;
            });

           // The whole response has been received. Print out the result.
            resp.on('end', () => {
              var toPaser2 = JSON.parse(datas);
              var gameid = toPaser2.gameId;
              var gamemode = toPaser2.gameMode;
              var mapid = toPaser2.mapId;
              var gameType = toPaser2.gameType;
              var gametime = toPaser2.gameStartTime;
              var nameplayers = toPaser2.participants;
              var players = toPaser2.participants;
              var desc1 =  gamemode;

                           
                  
            console.log(toPaser2);
            //console.log(desc2);
            //console.log(players);
           message5.channel.send({embed: {
            color: 3447003,
            description: "Datos del juego" ,
            fields: [{
              name: "Modo de juego",
              value: desc1
            },
            {
              name: "Campo2",
              value: "prueba"
            },
            {
              name: "jugadores",
              value: "Puedes poner todos los Markdown *cursiva* **__Marcado__** dentro de un embed."
            }
          ],
            
          }
      });
    

                });

}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 








          
         
       });


















    
    }
    
     
    
    
    
    
    ).on("error", (err) => {
      console.log("Error: " + err.message);
    });   
    
      //message2.channel.send(JSON.parse.data)
  } 













































});

client.login("NjY2MzY0MjY1NTY0NzMzNDgx.XhzHEw.VwuCLw7YE-lwcyLuLP7RVxbkmcE");