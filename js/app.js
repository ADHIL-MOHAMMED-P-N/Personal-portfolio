const TypingEffect = function (txt, word, wait = 3000) {
    this.txt = txt;
    this.word = word;
    this.wait = wait;
    this.currentTxt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//type method
TypingEffect.prototype.type = function () {
    //current index of word
    const current = this.wordIndex % this.word.length;
    //to get full text of current word
    const fulltxt = this.word[current];
    //check if deleting sate

    if (this.isDeleting) {
        //remove a char
        this.currentTxt = fulltxt.substring(0, this.currentTxt.length - 1)
    } else {
        //add char
        this.currentTxt = fulltxt.substring(0, this.currentTxt.length + 1)
    }
    //insert current txt into txt
    this.txt.innerHTML = `<span class="txt">${this.currentTxt}</span>`

    //type speed

    let typeSpeed = 200;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    //check word is complete
    if (!this.isDeleting && this.currentTxt == fulltxt) {
        //pause at end 
        typeSpeed = this.wait;
        //set delet to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.currentTxt === '') {
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed)
}


//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//init app
function init() {
    const txt = document.querySelector('.typing');
    const word = JSON.parse(txt.getAttribute('data-words'));
    const wait = txt.getAttribute('data-wait');
    //init typing effect

    new TypingEffect(txt, word, wait)
}

//animate on scroll

// aos init

AOS.init();