let assetArray = [
    {
        id: 2,
        name: 'church',
        price: 2000

    },
    {
        id: 3,
        name: 'centuary gate',
        price: 1500


    },
    {
        id: 4,
        name: 'convo',
        price: 3500

    }
    ,
    {
        id: 5,
        name: 'lbs ground',
        price: 5000

    }
    ,
    {
        id: 6,
        name: 'Rajeev bhawan',
        price: 5000
    }
    ,
    {
        id: 7,
        name: 'rajendra bhawan',
        price: 4000
    }
    ,
    {
        id: 9,
        name: 'rkb-tapri',
        price: 2000

    }
    ,
    {
        id: 10,
        name: 'ganga juice corner',
        price: 1700

    },
    {
        id: 11,
        name: 'cautley game centre',
        price: 2000

    }
    ,
    {
        id: 12,
        name: 'rkb tapri',
        price: 2000

    }
    ,
    {
        id: 13,
        name: 'MAC',
        price: 5000

    }
    ,
    {
        id: 14,
        name: 'saraswati temple',
        price: 1500

    }
    ,
    {
        id: 16,
        name: 'Thomson building',
        price: 6500

    }
    ,
    {
        id: 17,
        name: 'SAC',
        price: 5500

    }
    ,
    {
        id: 18,
        name: 'KB',
        price: 1000

    }
    ,
    {
        id: 19,
        name: 'SAROJANI BHAWAN :)',
        price: 3500

    }
    ,
    {
        id: 20,
        name: 'Archi-department',
        price: 4500

    }
    ,
    {
        id: 21,
        name: 'jawahar bhawan',
        price: 6000

    }
    ,
    {
        id: 23,
        name: 'electricl dep',
        price: 3000

    }
    ,
    {
        id: 24,
        name: 'civil madjoor-khana',
        price: 2000

    }
     ,
    {
        id: 25,
        name: 'EWS hostel',
        price: 1000

    }
       ,
    {
        id: 26,
        name: 'CSE dep.',
        price: 9000

    }
       ,
    {
        id: 27,
        name: 'himalaya ',
        price: 6000

    }
       ,
    {
        id: 28,
        name: 'LHC',
        price: 100

    }







]
function renderAsset() {
    assetArray.forEach(element => {
        const assetinfo = document.getElementById(`${element.id}`);
        assetinfo.insertAdjacentHTML('beforeend', `
            <div class="asset-info">
                <div class="id">${element.id}</div>
                <div class="name">${element.name}</div>
                <div class="price">${element.price}</div>
            </div>
        `);
    });
}
renderAsset();
const redcart = [];
const greencart = [];
function renderRedCart() {
    let cart = document.querySelector('.red-player .owned')
    cart.innerHTML = '';
    redcart.forEach(cartElement => {
        cart.insertAdjacentHTML('beforeend',
            `  <div class="asset-element"> <p>${cartElement.name}</p>  <button class="sell" data-asset-id="${cartElement.id}">Sell</button></div>`
        );
    })
}
function renderGreenCart() {
    let cart = document.querySelector(' .green-player .owned')
    cart.innerHTML = '';
    greencart.forEach(cartElement => {
        cart.insertAdjacentHTML('beforeend',
            `  <div class="asset-element"> <p>${cartElement.name}</p> <button class="sell" data-asset-id="${cartElement.id}">Sell</button>`)
    });
};
