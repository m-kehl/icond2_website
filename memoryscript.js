/* A: add clicking event to all elements "card" -> cards become clickable */
let addclick = document.getElementsByClassName("card");
for (let i = 0; i < addclick.length; i++) {
    addclick[i].addEventListener('click', clicking);
}

window.onload = function() {
  cards_shuffle();
};

/* B: shuffle order of frog_images randomly */

/* shuffle function according to Fisher-Yates shuffle */
function reorder_randomly(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function cards_shuffle(){
    const img_start = "img";
    let img_id = [];
    let img_source = [];
    let img_shuffled = [];

    for (var i = 0;i<16;i++){
        img_id[i] = img_start.concat(i);
        img_source[i] = document.getElementById(img_id[i]).src;
    }

    /* assign new image source to image id */
    img_shuffled = reorder_randomly(img_source);
    for (let i = 0; i < img_source.length; i++){
        document.getElementById(img_id[i]).src=img_shuffled[i];
    }

}

/* C: memory algorithm */

/* card turn only while game is released -> not possible to turn more than two cards a time  */
let play = Boolean(true);
let count_pairs = 0;
let count_tries = 0;
const name_tries = "Your tries: "
const name_pairs = "Found pairs: "
function clicking() { 
    if (play){
        
        /* add classes "clicky" and "active" to cards
           -> clicky -> turn card to from front (questionmark) to back (frog image)
           -> active -> the two cards turned together -> check whether they are the same or not */
        let card_turned = event.target.parentElement.parentElement;
        card_turned.classList.add("clicky");
        card_turned.classList.add("active");

        /* as soon as two cards are turned (two cards have class "active" -> check whether they are the same) */
        let count_active = document.querySelectorAll(".active").length;

        if (count_active > 1){
            play = Boolean(false);
            count_tries += 1;
            document.getElementById("tries").innerHTML = name_tries.concat(count_tries);
            let [active_first,active_second] = [document.querySelectorAll(".active")[0],document.querySelectorAll(".active")[1]];

            /* set timeout so user has some time (1s) to remember turned cards */
            let mytimeout = setTimeout(() => {
                const img_first = active_first.children[1].children[0].src.split("/").pop().split(".")[0];
                const img_second = active_second.children[1].children[0].src.split("/").pop().split(".")[0];
        
                /* check whether the two turned cards are equal to each other 
                    -> if not: remove "clicky" (they turn back) and remove "active" (so user can turn two other cards)
                    -> if yes: "clicky" stays -> they stay turned. "active" removed (user can turn next two cards) */
                if (img_first === img_second){
                    console.log("Pair found!")
                    count_pairs += 1;
                    document.getElementById("pairs").innerHTML = name_pairs.concat(count_pairs);
                } else{
                    active_first.classList.remove("clicky")
                    active_second.classList.remove("clicky")
                }
                active_first.classList.remove("active")
                active_second.classList.remove("active")
                play = Boolean(true)

            },1000)
        }
    }
}

/* start a new game by clicking on button */
function f_newgame(){
    play = Boolean(false)
    /* set initial classes*/
    document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.clicky').forEach(e => e.classList.remove('clicky'));
    /* set timeout, otherwise cards shuffle before potentially open cards turned */
    let mytimeout = setTimeout(() => {
        cards_shuffle();
        play = Boolean(true)
    },800)
    count_pairs = 0;
    count_tries = 0;
    document.getElementById("pairs").innerHTML = name_pairs.concat(count_pairs);
    document.getElementById("tries").innerHTML = name_tries.concat(count_tries);
    
}
