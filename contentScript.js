!(function(){
      const element = document.querySelector('.nome-auxiliar')
  if (element) {
    fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
        element.textContent
      )}`
    )
      .then(res => res.json())
      .then(({ data }) => {
        const {
          card_prices
        } = data[0]

        const element = `<div class="precos-edicoes" align="center">
  <div
    class="row bloco-preco-superior"
    title="Preço Médio card Normal (Sem extras)"
  >
    <div class="col-ext"><div class="avgp-extra">TCGPLAYER</div></div>
    <div class="col-prc col-prc-menor"> </div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-menor"font-size: 1.255rem">$ ${(card_prices[0].tcgplayer_price).toFixed(2)}</div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-maior">R$ ${(card_prices[0].tcgplayer_price * 5).toFixed(2)}</div>
  </div>
  <div
    class="row bloco-preco-superior"
    title="Preço Médio cards com Extra: Prismatic Secret Rare"
  >
    <div class="col-ext"><div class="avgp-extra avgp-extra-29">CARDMARKET</div></div>
    <div class="col-prc col-prc-menor"> </div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-menor"font-size: 1.255rem">€ ${(card_prices[0].cardmarket_price).toFixed(2)}</div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-maior">R$ ${(card_prices[0].cardmarket_price * 5.25).toFixed(2)}</div>
  </div>
</div>

        `
        document.querySelector('.desktop-price-lines-0').innerHTML += element;
        console.log(data)
      })
  } else {
    console.log('Element with class "nome-auxiliar" not found')
  }

})()