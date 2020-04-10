
function menuClicker(j){
    let res = function (e){
        dash.destroy();
        dash = new Control(app.node, 'div', 'basic_block dash_wrapper', '');
        app.category = j;
        for (let i=0; i<cards[1].length; i++){
            //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
            let el = new DoubleCard(dash.node, cards[j][i].word, cards[j][i].translation, 'assets/'+cards[j][i].image);
            dash.childList.push(el);       
        }
    }
    return res;
}

var seqPos=0;
// entry point
var mainNode = document.querySelector('#app-main-node');
//var app = new Control(mainNode, 'div', 'basic_block', 'rslang');



var app = new Control(mainNode, 'div', 'basic_block app_wrapper', '');
app.gameMode = 0;
app.category = 1;

var md = new Control(app.node, 'div', 'dash_modal', '');
var mdw = new Control(md.node, 'div', 'dash_modal_window', '');
var mdb = new Button(mdw.node, 'menu_button', 'ok',()=>{
    md.node.style='display:none';
    playButton.click();
});
md.node.style = "display:none";

var btNode = document.querySelector('#play-button');
//var app = new Control(mainNode, 'div', 'basic_block', 'rslang');
var playButton = new Button(btNode, 'menu_button', 'click to play', ()=>{
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
        playButton.node.textContent = 'stop game';
        let j = app.category;
        let cardIds = [];
        for (let i=0; i<cards[1].length; i++){
            cardIds.push(i);
        }
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

var menu = new Control(app.node, 'div', 'basic_block menu_wrapper', '');

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

for (let i=0; i<cards[1].length; i++){
    //let el = new Control(dash.node, 'div', 'basic_block dash_item', 'item'+i);
    let el = new DoubleCard(dash.node, cards[1][i].word, cards[1][i].translation, 'assets/'+cards[1][i].image);
    dash.childList.push(el);    
}


