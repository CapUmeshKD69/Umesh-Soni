
let oldRed = 1;
let oldGreen = 1;
let dieFace = 0;
let redMoney = 10000;
let greenMoney = 10000;

document.querySelector('.red-player .money').textContent = `$${redMoney}`;
document.querySelector('.green-player .money').textContent = `$${greenMoney}`;
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

const diceButton1 = document.querySelector('.dice-1');
const diceButton2 = document.querySelector('.dice-2');
let isRed = true;
let isGreen = true;
let nextplay = true;
function greenMOVE() {

    const currentPosition = document.getElementById(`${oldGreen}`);
    const greenElement = document.querySelector('.green');
    if (greenElement) {
        greenElement.remove();
    }

    dieFace = rollDie();
    const newPosition = (oldGreen + dieFace) % 28;


    const assetLand = document.getElementById(`${newPosition}`);


    const diceImg = diceButton2.querySelector('img');

    diceImg.src = `dice/dice-${dieFace}.png`;



    if (assetLand) {
        assetLand.innerHTML += '<div class="green"></div>';
    }

    const isRedOwned = redcart.find(ir => ir.id === newPosition);

    if (isRedOwned) {
        offerSale(newPosition, 'green-player', 'red-player');
    } else {
        const isGreenOwned = greencart.find(ig => ig.id === newPosition);
        if (isGreenOwned) {

        } else {

            buyORnot(newPosition, 'green-player');
        }
    }

    oldGreen = newPosition;
    isGreen = false
    isRed = true
}
function redMOVE() {

    const currentPosition = document.getElementById(`${oldRed}`);
    const redElement = document.querySelector('.red');
    if (redElement) {
        redElement.remove();
    }
    dieFace = rollDie();
    const newPosition = (oldRed + dieFace) % 28;
    const assetLand = document.getElementById(`${newPosition}`);
    const diceImg = diceButton1.querySelector('img');

    diceImg.src = `dice/dice-${dieFace}.png`;

    if (assetLand) {
        assetLand.innerHTML += '<div class="red"></div>';
    }
    const isGreenOwned = greencart.find(ig => ig.id === newPosition);

    if (isGreenOwned) {
        offerSale(newPosition, 'red-player', 'green-player');
    } else {
        const isRedOwned = redcart.find(ir => ir.id === newPosition);
        if (isRedOwned) {

        } else {

            buyORnot(newPosition, 'red-player');
        }
    }


    oldRed = newPosition;
    isGreen = true;
    isRed = false;

}
diceButton1.addEventListener('click', () => {
    if (isRed && nextplay) redMOVE();
});

diceButton2.addEventListener('click', () => {
    if (isGreen && nextplay) greenMOVE();
});
const redInput = document.getElementById('redp');
const greenInput = document.getElementById('greenp');
redInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const playerName = document.querySelector('.redp');
        playerName.textContent = redInput.value;
        redInput.remove();

    }
});
greenInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const playerName = document.querySelector('.greenp');
        playerName.textContent = greenInput.value;
        greenInput.remove();

    }
});
function buyORnot(newposition, playercolor) {
    const parent = document.querySelector(`.${playercolor}`);
    parent.insertAdjacentHTML('beforeend',
        `<div class="buy-button">
     <p>Do you wanna buy?</p>
     <button onclick = "bought(${newposition}, '${playercolor}')">Yes</button>
     <button>No</button>
   </div>`

    );
    nextplay = false;
    const buydes = parent.querySelector('.buy-button');
    const desButton = buydes.querySelectorAll('button');

    desButton.forEach(btn => {
        btn.addEventListener('click', () => {
            buydes.remove();
            nextplay = true;
        });
    });
};
function bought(newposition, playercolor) {
    const partiasset = assetArray.find(element => element.id === parseInt(newposition));
    if (!partiasset) return;
    const parent = document.querySelector(`.${playercolor}`);
    if (playercolor === 'red-player') {
        if (redMoney - partiasset.price < 0) {
            alert("insufficient money");

            return;
        }
        redMoney -= partiasset.price;
        document.querySelector('.red-player .money').textContent = `$${redMoney}`;
        redcart.push(partiasset);
        renderRedCart();

    } else {
        if (greenMoney - partiasset.price < 0) {
            alert("insufficient money");
            return;
        }
        greenMoney -= partiasset.price;
        document.querySelector('.green-player .money').textContent = `$${greenMoney}`;
        greencart.push(partiasset);
        renderGreenCart();
    };
   



document.body.addEventListener('click', (event) => {
    if (!event.target.matches('.sell')) return;
    
    const sellButton = event.target;
    const assetId = sellButton.dataset.assetId;  
    
  
    const cartContainer = sellButton.closest('.player'); 
    const playerColor = cartContainer.classList.contains('red-player') 
        ? 'red-player' 
        : 'green-player';
    
    // Find the asset
    const cart = playerColor === 'red-player' ? redcart : greencart;
    const partiasset = cart.find(item => item.id === parseInt(assetId));
    
    if (!partiasset) return;
    
    // Update money
    if (playerColor === 'red-player') {
        redMoney += partiasset.price;
        document.querySelector('.red-player .money').textContent = `$${redMoney}`;
        const index = cart.findIndex(item => item.id === partiasset.id);
        if (index > -1) redcart.splice(index, 1);
    } else {
        greenMoney += partiasset.price;
        document.querySelector('.green-player .money').textContent = `$${greenMoney}`;
        const index = cart.findIndex(item => item.id === partiasset.id);
        if (index > -1) greencart.splice(index, 1);
    }
    
    
    if (playerColor === 'red-player') renderRedCart();
    else renderGreenCart();
});

}
;
function offerSale(newPosition, landingColor, ownerColor) {
    let landingMoney;
    let ownerMoney;
    let asset;
    if (ownerColor === 'red-player') {
        asset = redcart.find(a => a.id === newPosition);
    }
    else {
        asset = greencart.find(a => a.id === newPosition);
    }

    if (!asset) return;

    const oparent = document.querySelector(`.${ownerColor}`);
    const lparent = document.querySelector(`.${landingColor}`);
    let selldes = null;
    let buydes = null;

    
    oparent.insertAdjacentHTML('beforeend',
        `<div class="sell-button">
            <p>Do you wanna sell this?</p>
            <button class="sell-yes">Yes</button>
            <button class="sell-no">No</button>
        </div>`
    );
    selldes = oparent.querySelector('.sell-button');

    selldes.querySelector('.sell-yes').addEventListener('click', sellrequest);
    selldes.querySelector('.sell-no').addEventListener('click', buyNo);

    function sellrequest() {

        lparent.insertAdjacentHTML('beforeend',
            `<div class="buy-button">
                <p>Do you wanna buy?</p>
                <button class="buy-yes">Yes</button>
                <button class="buy-no">No</button>
            </div>`
        );
        buydes = lparent.querySelector('.buy-button');


        buydes.querySelector('.buy-yes').addEventListener('click', sellYes);
        buydes.querySelector('.buy-no').addEventListener('click', sellNo);
    };

    function sellYes() {

        const salePrice = asset.price * 1.1;


        if (landingColor === 'red-player') {
            redMoney -= salePrice;
            greenMoney += salePrice;
        } else {
            greenMoney -= salePrice;
            redMoney += salePrice;
        }

        let sellerCart;
        let buyerCart;

        
        if (ownerColor === 'red-player') {
            sellerCart = redcart;
        } else {
            sellerCart = greencart;
        }

     
        if (landingColor === 'red-player') {
            buyerCart = redcart;
        } else {
            buyerCart = greencart;
        }


        const sellerIndex = sellerCart.findIndex(item => item.id === asset.id);
        if (sellerIndex > -1) sellerCart.splice(sellerIndex, 1);


        buyerCart.push({ ...asset});


        document.querySelector('.red-player .money').textContent = `$${redMoney}`;
        document.querySelector('.green-player .money').textContent = `$${greenMoney}`;
        renderRedCart();
        renderGreenCart();

       
        selldes.remove();
        if (buydes) buydes.remove();
        nextplay = true;
    }

    function sellNo() {
       
        applyTax();
        if (buydes) buydes.remove();
        nextplay = true;
    }

    function buyNo() {
        applyTax();
        if (selldes) selldes.remove();
        nextplay = true;
    }

    function applyTax() {
        const tax = Math.floor(asset.price * 0.05);
        if (landingColor === 'red-player') {
            redMoney -= tax;
            greenMoney += tax;
        } else {
            greenMoney -= tax;
            redMoney += tax;
        }
        document.querySelector('.red-player .money').textContent = `$${redMoney}`;
        document.querySelector('.green-player .money').textContent = `$${greenMoney}`;
    }

    nextplay = false;
}

