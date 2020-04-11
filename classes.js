class Control {
    // Hard DOM functions
    constructor (parentNode, tagName, className, textContent){
        this.node = document.createElement(tagName);
        this.childList = [];
        this.render(className, textContent);
        parentNode.appendChild(this.node);
    }

    destroy (){
        this.childList.forEach = ((it)=>{
            it.destroy();
        });
        //this.childList = null;
        this.node.remove();
        //this = null;
    }

    // style and content functions
    render (className, textContent){
        this.node.className = className;
        this.node.textContent = textContent;
    }

    // own props functions
}

class Button extends Control {
    constructor (parentNode, className, textContent, click){
        super(parentNode, 'div', className, textContent);
        this.click = click;
        this.node.addEventListener('click', this.click);
    }

}

class Card extends Control{
    constructor (parentNode, cardName, ruName, imgURL){
        super(parentNode, 'div', 'dash_item', '');

        this.name = new Control(this.node,'div', 'card_name', cardName);
        let imgWrapper = new Control(this.node,'div', 'card_img', '');
        this.img = new Control(imgWrapper.node,'img', '', '');
        this.img.node.src = imgURL;
        let cardMenu = new Control(this.node,'div', 'card_menu', '');
        this.rotateButton = new Button(cardMenu.node, 'card_button', 'rotate', (event)=>{
            this.rotate(180);
        });
        this.node.addEventListener('mouseleave',()=>{
            this.rotate(0);
        })
        this.listenButton = new Control(cardMenu.node,'div', 'card_button', 'listen');
    }

    rotate (deg){
        if (deg>0){
            this.rotateButton.node.style = 'transition-duration: 400ms; opacity:0';
            this.listenButton.node.style = 'transition-duration: 400ms; opacity:0';
            this.name.node.style = 'transition-duration: 400ms; opacity:0';
            this.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+deg+'deg)';
        } else {
            this.rotateButton.node.style = 'transition-duration: 400ms; opacity:100';
            this.listenButton.node.style = 'transition-duration: 400ms; opacity:100';
            this.name.node.style = 'transition-duration: 400ms; opacity:100';
            this.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+deg+'deg)';
        }
    }
}

class DoubleCard extends Control {
    constructor (parentNode, cardName1, cardName2, imgURL){
        super(parentNode, 'div', 'dash_item', '');
        this.sideA = new Control (this.node,'div', 'card_side card_side_a', '');
        this.sideB = new Control (this.node,'div', 'card_side', '');
        this.sideB.name = new Control(this.sideB.node,'div', 'card_name', cardName2);
        let imgWrapper = new Control(this.sideB.node,'div', 'card_img', '');
        this.sideB.img = new Control(imgWrapper.node,'img', '', '');
        imgWrapper.node.style='transform: rotateY(180deg);'
        this.sideB.img.node.src = imgURL;
        this.sideB.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+(180)+'deg)';

        this.aud = new Control(this.node, 'audio','','');
        this.aud.node.src='assets/audio/'+cardName1+'.mp3';

        this.sideA.name = new Control(this.sideA.node,'div', 'card_name', cardName1);
        imgWrapper = new Control(this.sideA.node,'div', 'card_img', '');
        this.sideA.img = new Control(imgWrapper.node,'img', '', '');
        this.sideA.img.node.src = imgURL;
        let cardMenu = new Control(this.sideA.node,'div', 'card_menu', '');
        this.rotateButton = new Button(cardMenu.node, 'card_button', 'rotate', (event)=>{
            this.rotate(180);
        });
        this.node.addEventListener('mouseleave',()=>{
            this.rotate(0);
        })
        this.listenButton = new Button(cardMenu.node, 'card_button', 'listen', (event)=>{
            console.log(3);
            this.aud.node.play();
        });
        this.rotate(0);
        
        //this.node.style = 'height:'+(this.sideA.node.clientHeight)+'px';
    }

    rotate (deg){
        this.sideA.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+deg+'deg)';
        this.sideB.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+(180+deg)+'deg)';
    }
}


class PlayCard extends Control {
    constructor (parentNode, cardName1, num, imgURL){
        super(parentNode, 'div', 'dash_item', '');
        this.cardName = cardName1;
        this.num=num;
        this.sideA = new Button (this.node, 'card_side card_side_a', '',()=>{
           if (this.active) {
               this.active = false;
               this.play();
           }
        });
        this.active = true;
        let imgWrapper = new Control(this.sideA.node,'div', 'card_img', '');
        this.sideA.img = new Control(imgWrapper.node,'img', '', '');
        this.sideA.img.node.src = imgURL;
        //this.rotate(0);
    }

    play (){
        //starBlock.node.innerHtml='';
        
        if (this.cardName == cardSnd[0].name){
            let star = new Control(starBlock.node, 'div', 'star_item star_item_ok', '');
            this.sideA.node.style = 'opacity: 50%; background-color:#00ff00';
        } else {
            let star = new Control(starBlock.node, 'div', 'star_item star_item_err', '');
            seqPos++;
            //difWords.push(this.cardName); ///maybe its right
            if (difWords.indexOf(cardSnd[0].name)==-1) {difWords.push(cardSnd[0].name);}
            this.sideA.node.style = 'opacity: 50%; background-color:#ff0000';
            //cardSnd.push(cardSnd[seqPos]);
            
        }
        if (cardSnd.length>0){
                
                cardSnd = cardSnd.filter((it)=>{
                    return this.cardName != it.name;
                });
            }
            
        //seqPos++;
        if (cardSnd[0]){
            cardSnd[0].node.play();
        }
        if (cardSnd.length==0) {
           // playButton.click()
           if (seqPos==0){
            mdm.node.textContent = "Amazing! You havent any mistake";
           } else {
            mdm.node.textContent = "Youve got"+seqPos+" mistakes with words "+difWords.join(', ');
           } 
           md.node.style='';
        }
       // this.sideB.node.style = 'z-index: 1; transform: perspective(500px) rotateY('+(180+deg)+'deg)';
    }
}

class CategoryCard extends Control {
    constructor (parentNode, cardName1, num, imgURL){
        super(parentNode, 'div', 'dash_item', '');
        this.num=num;
        this.sideA = new Button (this.node, 'card_side card_side_a', '',
            menuClicker(num));
        this.active = true;
        this.cardName = new Control(this.sideA.node,'div', 'card_name', cardName1);
        let imgWrapper = new Control(this.sideA.node,'div', 'card_img category_img', '');
        this.sideA.img = new Control(imgWrapper.node,'img', '', '');
        this.sideA.img.node.src = imgURL;
        //this.rotate(0);
    }
}
