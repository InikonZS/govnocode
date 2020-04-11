
function menuClicker(j){
    let res = (e)=>{
        dash.destroy();
        dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');
        app.category = j;
        category.textContent = cards[0][j-1];
        catDescription.textContent = "Use listen button to learn word and rotate button to see a translate. Click start game to test youself.";
        menu.childList.forEach(it=>{
            it.node.className=('menu_button');
        });
        menu.childList[j].node.className=('menu_button menu_button_active');
        for (let i=0; i<cards[1].length; i++){
            //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
            let el = new DoubleCard(dash.node, cards[j][i].word, cards[j][i].translation, 'assets/'+cards[j][i].image);
            //el.node.style='transform: scale(1);'
            dash.childList.push(el);       
        }
    }
    return res;
}

function menuExtClicker(j){
    let res = function (e){
        dash.destroy();
        dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');
        app.category = j;
        category.textContent = "Main";
        catDescription.textContent = "Select one of word categories to learn";
        menu.childList.forEach(it=>{
            it.node.className=('menu_button');
        });
        menu.childList[0].node.className=('menu_button menu_button_active');
        for (let i=0; i<cards[0].length; i++){
            //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
            let el = new CategoryCard(dash.node, cards[0][i], i+1, 'assets/'+cards[i+1][0].image);
            dash.childList.push(el);       
        }
    }
    return res;
}

var category=document.querySelector('#category');
var catDescription=document.querySelector('#category-description');
var seqPos=0;
var difWords=[];
var cardSnd=[];
// entry point
var mainNode = document.querySelector('#app-main-node');
//var gameControl = document.querySelector('.game_control');
var gameControl_ = new Control(mainNode, 'div', 'game_control', '');
var gameControl = gameControl_.node;
var returnButton = new Button(gameControl, 'menu_button', 'to Main', menuExtClicker('main'));




//var app = new Control(mainNode, 'div', 'basic_block', 'rslang');



var app = new Control(mainNode, 'div', 'basic_block app_wrapper', '');
app.gameMode = 0;
app.category = 1;

var md = new Control(app.node, 'div', 'dash_modal', '');
var mdw = new Control(md.node, 'div', 'dash_modal_window', '');
var mdm = new Control(mdw.node, 'div', 'menu_button', '');
var mdb = new Button(mdw.node, 'menu_button', 'ok',()=>{
    md.node.style='display:none';
    playButton.click();
});
md.node.style = "display:none";

var btNode = document.querySelector('#play-button');
//var app = new Control(mainNode, 'div', 'basic_block', 'rslang');
var playButton = new Button(gameControl, 'menu_button', 'click to play', ()=>{
    if (app.gameMode){
        dash.destroy();
        dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');
        app.gameMode = 0;
        playButton.node.textContent = 'click to play';
        let j = app.category;
        for (let i=0; i<cards[1].length; i++){
            //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
            let el = new DoubleCard(dash.node, cards[j][i].word, cards[j][i].translation, 'assets/'+cards[j][i].image);
            dash.childList.push(el);       
        }

    } else {
        dash.destroy();
        dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');
        app.gameMode = 1;
        starBlock.node.textContent='';
        playButton.node.textContent = 'stop game';
        difWords=[];
        let j = app.category;
        let cardIds = [];
        for (let i=0; i<cards[1].length; i++){
            cardIds.push(i);
        }
        cardIds.sort(()=>Math.random()-0.5);

        cardSnd = [];
        for (let iq=0; iq<cards[1].length; iq++){
            //cardIds.push(i);
            let i = cardIds[iq];
            let aud = new Control(mainNode, 'audio','','');
            aud.node.src='assets/audio/'+cards[j][i].word+'.mp3';
            aud.name = cards[j][i].word;
            cardSnd.push(aud);
        }
        cardSnd[0].node.play();
       
        
        cardIds.sort(()=>Math.random()-0.5);

        for (let iq=0; iq<cards[1].length; iq++){
            //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
            let i = cardIds[iq];
            let el = new PlayCard(dash.node, cards[j][i].word, i, 'assets/'+cards[j][i].image);
            dash.childList.push(el);       
        }

        seqPos=0;
    }

});
var hdr = document.querySelector('#header-menu');

var menu = new Control(hdr, 'div', 'basic_block menu_burger', '');
let el = new Button(menu.node,'menu_button', 'Main Page', menuExtClicker('main'));
menu.childList.push(el); 

menu.visible = 0;
menu.node.style = "height:0px; overflow-y:hidden";


var burg = new Button(hdr, 'burger', '',()=>{
    console.log(menu.visible);
    if (menu.visible == 1){
        menu.node.style = "height:0px; overflow-y:hidden";
        menu.visible = 0;
        burg.node.style="";
    } else {
        menu.node.style = "";
        menu.visible = 1;
        burg.node.style="transform: rotateZ(90deg);";
    }
});
el = new Control (burg.node, 'img', '', '');
el.node.src = "assets/ico/burger.png";

for (let i=0; i<cards[0].length; i++){
    //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
    let el = new Button(menu.node,'menu_button', cards[0][i], menuClicker(i+1));
    menu.childList.push(el);    
}



var dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');



/*for (let i=0; i<12; i++){
    //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
    let el = new DoubleCard(dash.node, 'card'+i, 'ru', 'img/i'+(i+1)+'.png');
    dash.childList.push(el);    
}*/

/*for (let i=0; i<cards[1].length; i++){
    //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
    let el = new DoubleCard(dash.node, cards[1][i].word, cards[1][i].translation, 'assets/'+cards[1][i].image);
    dash.childList.push(el);    
}*/


var repeatButton = new Button(gameControl, 'menu_button', 'repeat word',()=>{
    if (app.gameMode) {
        cardSnd[0].node.play();
    }   
});
var starBlock = new Control(gameControl, 'div', 'star_block', '');

returnButton.click();



var stat = document.querySelector('#app-stat');
new Control(stat, 'h1', '', 'Statistic:'); 
for (let i=0; i<cards[0].length; i++){
    for (let j=0; j<cards[i+1].length; j++){
        new Control(stat, 'p', '', cards[i+1][j].word + " ("+ cards[i+1][j].translation+")");    
    }
}
