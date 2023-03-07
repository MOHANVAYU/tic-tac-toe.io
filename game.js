let arr=["cross-img.svg","circle-img.svg"];
let turn=document.getElementById("img-arrow");
let parent=document.getElementById("background-container");

const UNMARKED=0;
const CROSS=1;
const CIRCLE=2;
let count=0;

myJson={
    "board":[[{"symbol":UNMARKED},
            {"symbol":UNMARKED},
            {"symbol":UNMARKED}],

            [{"symbol":UNMARKED},
            {"symbol":UNMARKED},
            {"symbol":UNMARKED}],

            [{"symbol":UNMARKED},
            {"symbol":UNMARKED},
            {"symbol":UNMARKED}]],
    "turn":false,
    "checkPoint":false,
    "winner":0,
    "final":false
};

function begin(str){
    if(str=='cross' && myJson["checkPoint"]!=true){
        myJson["turn"]=false;
        turn.style.display="inline";
        turn.style.transform="rotate(180deg)";
        myJson["checkPoint"]=true;
    }else if(str=='circle' && myJson["checkPoint"]!=true){
        myJson["turn"]=true;
        turn.style.display="inline";
        myJson["checkPoint"]=true;
    }
}

function mark(row,column){
    if(myJson["checkPoint"]==false){
        return;
    }
    //cross
    if(myJson["turn"]==false && myJson["board"][row][column].symbol==UNMARKED){
        //adding cross-img
        let div=document.getElementById(`${row}-${column}`);
        let temp=document.createElement("img");
        temp.src=`img/${arr[0]}`;
        div.appendChild(temp);

        myJson["board"][row][column].symbol=CROSS;
        myJson["turn"]=true;
        count++;
        let temp2=CROSS;
        check(row,column,temp2);
    }
    //circle
    else if(myJson["turn"]==true && myJson["board"][row][column].symbol==UNMARKED){
        //adding circle-img
        let div=document.getElementById(`${row}-${column}`);
        let temp=document.createElement("img");
        temp.src=`img/${arr[1]}`;
        div.appendChild(temp);

        myJson["board"][row][column].symbol=CIRCLE;
        myJson["turn"]=false;
        count++;
        let temp2=CIRCLE;
        check(row,column,temp2);
    }
}

function check(row,column,sym){
    if(myJson["board"][row][0].symbol==sym && myJson["board"][row][1].symbol==sym && myJson["board"][row][2].symbol==sym){
        if(sym==CROSS){
            myJson["winner"]="CROSS";
            myJson["final"]=true;
            checkWinner();
        }else{
            myJson["winner"]="CIRCLE";
            myJson["final"]=true;
            checkWinner();
        }
    }
    if(myJson["board"][0][column].symbol==sym && myJson["board"][1][column].symbol==sym && myJson["board"][2][column].symbol==sym){
        if(sym==CROSS){
            myJson["winner"]="CROSS";
            myJson["final"]=true;
            checkWinner();
        }else{
            myJson["winner"]="CIRCLE";
            myJson["final"]=true;
            checkWinner();
        }
    }
    if(myJson["board"][0][0].symbol==sym && myJson["board"][1][1].symbol==sym && myJson["board"][2][2].symbol==sym){
        if(sym==CROSS){
            myJson["winner"]="CROSS";
            myJson["final"]=true;
            checkWinner();
        }else{
            myJson["winner"]="CIRCLE";
            myJson["final"]=true;
            checkWinner();
        }
    }
    if(myJson["board"][0][2].symbol==sym && myJson["board"][1][1].symbol==sym && myJson["board"][2][0].symbol==sym){
        if(sym==CROSS){
            myJson["winner"]="CROSS";
            myJson["final"]=true;
            checkWinner();
        }else{
            myJson["winner"]="CIRCLE";
            myJson["final"]=true;
            checkWinner();
        }
    }
    if(count==9){
        if(myJson["final"]!=true){
            myJson["winner"]="DRAW";
            checkWinner();
        }
    } 
}

function checkWinner(){
    myJson["checkPoint"]=false;
    const pop=document.createElement("div");
    pop.id="pop";
    parent.appendChild(pop);
    const para=document.createElement("p");
    if(myJson["winner"]=="DRAW"){
        para.innerHTML=`Game ${myJson["winner"]}!!`;
    }else{
        para.innerHTML=`${myJson["winner"]} wins!! congratulation!!`;
    }
    pop.appendChild(para);
}

//button functions:index-page
function newGame(){
    window.open("game.html","_self");
}
function quitGame(){
    window.open("index.html","_self");
}