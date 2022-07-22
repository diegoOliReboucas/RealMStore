let cart = [];
let modalKey = 0;

camisasJson.map((item, index) => {
  let camisaItem = document
    .querySelector('.models .camisaItem')
    .cloneNode(true);

  document.querySelector('.camisasArea').append(camisaItem);

  camisaItem.setAttribute('data-key', index);
  camisaItem.querySelector('.camisaItem-img img').src = item.img;
  camisaItem.querySelector('.camisaItem2-img img').src = item.imgB;
  camisaItem.querySelector('.camisaItem-name').innerHTML = item.name;
  camisaItem.querySelector('.camisaItem-price').innerHTML =
    'R$: ' + item.price.toFixed(2);
  camisaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    let key = e.target.closest('.camisaItem').getAttribute('data-key');
    qntNumber = 1;
    modalKey = key;

    document.querySelector('.bigImg').src = camisasJson[key].img;
    document.querySelectorAll('.windowImgs-small img')[0].src =
      camisasJson[key].img;
    document.querySelectorAll('.windowImgs-small img')[1].src =
      camisasJson[key].imgB;
    document.querySelectorAll('.windowImgs-small img')[2].src =
      camisasJson[key].imgM;
    document.querySelector('.windowInfos h1').innerHTML = camisasJson[key].name;
    document.querySelector('.windowInfos-price').innerHTML =
      'R$: ' + camisasJson[key].price.toFixed(2);
    //Pre-Selecionados
    document
      .querySelectorAll('.windowInfos-model')
      .forEach((itemModel, indexModel) => {
        if (indexModel < 1) {
          itemModel.classList.add('selected');
        } else {
          itemModel.classList.remove('selected');
        }
      });
    document
      .querySelectorAll('.windowInfos-size')
      .forEach((itemSize, indexSize) => {
        if (indexSize < 1) {
          itemSize.classList.add('selected');
        } else {
          itemSize.classList.remove('selected');
        }
      });
    document
      .querySelectorAll('.imgSmall')
      .forEach((itemSmallImg, indexSmallImg) => {
        if (indexSmallImg < 1) {
          itemSmallImg.classList.add('selected-img');
        } else {
          itemSmallImg.classList.remove('selected-img');
        }
      });
    document.querySelector('.windowImg-Player').innerHTML = ' ';
    document.querySelector('.windowImg-Player').style.display = 'none';
    // --

    document.querySelector('.windowInfos-qt').innerHTML = qntNumber;

    document.querySelector('.windowArea').style.opacity = '0';
    document.querySelector('.windowArea').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.windowArea').style.opacity = '1';
    }, 500);

    //Imagem Select
    document.querySelectorAll('.imgSmall').forEach((imgSmall, indexSmall) => {
      imgSmall.addEventListener('click', () => {
        document
          .querySelector('.imgSmall.selected-img')
          .classList.remove('selected-img');
        imgSmall.classList.add('selected-img');

        switch (indexSmall) {
          case 0:
            document.querySelector('.bigImg ').src = '';
            document.querySelector('.bigImg').src = camisasJson[key].img;
            document.querySelector('.windowImg-Player').style.display = 'none';
            break;
          case 1:
            document.querySelector('.bigImg ').src = '';
            document.querySelector('.bigImg').src = camisasJson[key].imgB;
            document.querySelector('.windowImg-Player').style.display = 'flex';
            break;
          case 2:
            document.querySelector('.bigImg ').src = '';
            document.querySelector('.bigImg').src = camisasJson[key].imgM;
            document.querySelector('.windowImg-Player').style.display = 'none';
            break;
        }
      });
    });
    //Color Player name
    switch (key) {
      case '0':
        document.querySelector('.windowImg-Player').style.color = '#000';
        break;
      case '1':
        document.querySelector('.windowImg-Player').style.color = '#FFF';
        console.log('o');
        break;
      case '2':
        document.querySelector('.windowImg-Player').style.color = '#FFF';
        break;
      case '3':
        document.querySelector('.windowImg-Player').style.color = '#FFF';
        break;
      default:
        document.querySelector('.windowImg-Player').style.color = '#FFF';
        break;
    }
  });
});
function closeModal() {
  document.querySelector('.windowArea').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.windowArea').style.display = 'none';
  }, 500);
}
document
  .querySelectorAll('.windowInfos-add, .windowInfos-out')
  .forEach((item) => {
    item.addEventListener('click', closeModal);
  });

document
  .querySelector('.windowInfos-quantMais')
  .addEventListener('click', () => {
    qntNumber += 1;
    document.querySelector('.windowInfos-qt').innerHTML = qntNumber;
  });
document
  .querySelector('.windowInfos-quantMenos')
  .addEventListener('click', () => {
    if (qntNumber > 1) {
      qntNumber -= 1;
      document.querySelector('.windowInfos-qt').innerHTML = qntNumber;
    }
  });

document
  .querySelectorAll('.windowInfos-size')
  .forEach((itemSize, indexSize) => {
    itemSize.addEventListener('click', () => {
      document
        .querySelector('.windowInfos-size.selected')
        .classList.remove('selected');
      itemSize.classList.add('selected');
    });
  });
document
  .querySelectorAll('.windowInfos-model')
  .forEach((itemModel, indexModel) => {
    itemModel.addEventListener('click', () => {
      document
        .querySelector('.windowInfos-model.selected')
        .classList.remove('selected');
      itemModel.classList.add('selected');
    });
  });
document.querySelectorAll('.players').forEach((item) => {
  item.addEventListener('change', () => {
    console.log(item.value.slice(0, -2));
    if (item.value === 'Personalize') {
      let playerN;
      let playerNa = '';
      document.querySelector('.playerPerso').style.display = 'flex';

      document
        .getElementById('playerNumber')
        .addEventListener('focusout', (item) => {
          playerN = Number(item.target.value);
          console.log(playerN);

          if (playerN < 100 && playerN > 0) {
            document.querySelector('.windowImg-Player').innerHTML =
              playerNa.toUpperCase() + '<span>' + parseInt(playerN) + '</span>';
          }
        });

      document
        .getElementById('playerName')
        .addEventListener('focusout', (item) => {
          playerNa = item.target.value;
          console.log(playerNa);

          document.querySelector('.windowImg-Player').innerHTML =
            playerNa.toUpperCase() + '<span>' + parseInt(playerN) + '</span>';
        });
    } else if (item.value === 'None') {
      document.querySelector('.windowImg-Player').innerHTML = '';
      document.querySelector('.playerPerso').style.display = 'none';
    } else {
      let shirtNumber = item.value.slice(-2).trim();
      document.querySelector('.playerPerso').style.display = 'none';
      document.querySelectorAll('.playerPerso-input input').forEach((item) => {
        item.value = ' ';
      });
      document.querySelector('.windowImg-Player').innerHTML =
        item.value.slice(0, -2).toUpperCase() +
        '<span>' +
        shirtNumber +
        '</span>';
    }
  });
});
document.querySelector('.header-cart').addEventListener('click', () => {
  if (cart.length > 0) {
    document.querySelector('aside').style.display = 'flex';

    document.querySelector('aside').style.width = '21vw';
    document.querySelector('.camisasArea').style.gridTemplateColumns =
      'repeat(3, 1fr)';
  }
});
document.querySelector('.closeCart').addEventListener('click', () => {
  document.querySelector('.camisasArea').style.gridTemplateColumns =
    'repeat(4, 1fr)';
  document.querySelector('aside').style.display = 'none';
  document.querySelector('aside').style.width = '0vw';
});

document.querySelector('.windowInfos-add').addEventListener('click', () => {
  //Qual a camisa? modalKey
  //Qual o tamanho? sizeSelected
  let sizeSelected = document
    .querySelector('.windowInfos-size.selected')
    .getAttribute('data-size');
  //Qual o jogador? jogado
  let jogado = document
    .querySelector('.windowImg-Player')
    .innerText.slice(0, -2);
  //Qual o numero do jogador? numberJ
  let numberJ = parseInt(
    document
      .querySelector('.windowImg-Player')
      .innerText.slice(-2)
      .replace('-', ' '),
  );
  console.log(numberJ);
  //Qual o modelo? modelSelected
  let modelSelected = document
    .querySelector('.windowInfos-model.selected')
    .getAttribute('data-model');
  //Qual a quanatidade? qntNumber

  let identifier =
    camisasJson[modalKey].id +
    '@' +
    sizeSelected +
    '@' +
    modelSelected +
    '@' +
    jogado +
    '@' +
    numberJ +
    '@';

  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].Quantity += qntNumber;
  } else {
    cart.push({
      identifier,
      id: camisasJson[modalKey].id,
      size: sizeSelected,
      model: modelSelected,
      player: jogado,
      number: numberJ,
      Quantity: qntNumber,
    });
  }

  updateCart();
});

function updateCart() {
  document.querySelector('.cart').innerHTML = '';

  let total = 0;
  let subTotal = 0;
  for (let i in cart) {
    let camisaItem = camisasJson.find((item) => item.id == cart[i].id);

    subTotal += camisaItem.price * cart[i].Quantity;

    let cartItem = document.querySelector('.cartItem').cloneNode(true);
    let camisaSize;
    let camisaModel;
    switch (cart[i].size) {
      case '0':
        camisaSize = 'XS';
        break;
      case '1':
        camisaSize = 'S';
        break;
      case '2':
        camisaSize = 'M';
        break;
      case '3':
        camisaSize = 'L';
        break;
      case '4':
        camisaSize = 'XL';
        break;
      case '5':
        camisaSize = '2XL';
        break;
    }
    switch (cart[i].model) {
      case '0':
        camisaModel = 'Man';
        break;
      case '1':
        camisaModel = 'Woman';
        break;
    }

    let camisaName = `${camisaItem.name} (${camisaSize})`;

    cartItem.querySelector('img').src = camisaItem.img;
    cartItem.querySelector('.cartItem-name').innerHTML = camisaName;
    cartItem.querySelector(
      '.cartItem-model',
    ).innerHTML = `Style: ${camisaModel}`;
    if (cart[i].player !== '') {
      cartItem.querySelector(
        '.cartItem-player',
      ).innerHTML = `Player: ${cart[i].player} (${cart[i].number}) `;
    } else {
      cartItem.querySelector('.cartItem-player').innerHTML = `Player: `;
    }
    cartItem.querySelector(
      '.cartItem-quantity',
    ).innerHTML = `Quantity: ${cart[i].Quantity} <small>remover</small>`;
    cartItem
      .querySelector('.cartItem-quantity small')
      .addEventListener('click', () => {
        cart.splice(i, 1);
        if (cart.length < 1) {
          document.querySelector('aside').style.width = '0vw';
          document.querySelector('aside').style.display = 'none';
          document.querySelector('.camisasArea').style.gridTemplateColumns =
            'repeat(4, 1fr)';
        }
        updateCart();
      });

    document.querySelector('.cart').append(cartItem);
  }
  total = total + subTotal;
  document.querySelector(
    '.cartTotal span:last-child',
  ).innerHTML = `R$: ${total}`;

  document.querySelector('.header-cart small').innerHTML = cart.length;
}
