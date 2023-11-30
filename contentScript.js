window.addEventListener("load", async (event) => {
  const englishNameElement = document.querySelector(".nome-auxiliar");
  const portugueseNameElement = document.querySelector(".nome-principal span");
  const findEdicao = () => document.querySelector("li.ed-sel font").innerText

  if (englishNameElement && portugueseNameElement) {
    const quote = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
    );
    const { USDBRL, EURBRL } = await quote.json();
    const { ask: dollar } = USDBRL;
    const { ask: euro } = EURBRL;

    const cardName =
      englishNameElement.textContent || portugueseNameElement.textContent;
    const res = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
        cardName
      )}&tcgplayer_data`
    );
    const { data } = await res.json();
    const { card_prices } = data[0];
    console.log(data[0]);

    Array.from(document.querySelectorAll("li[id^=edcard")).forEach((el) => {
      el.addEventListener("mouseover", () => {
        const price = data[0].card_sets
          .sort((b, a) => b.set_price - a.set_price)
          .find(({ set_code }) => set_code === findEdicao())?.set_price;
        if (!price) return;
        document.querySelector("#precousd").innerHTML = '$ ' + (price)
        document.querySelector("#precousdconvertido").innerHTML = 'R$ ' + (price * dollar).toFixed(2)
      });
    });

    const element = `<div class="" align="center">
  <div
    class="row bloco-preco-superior"
    title="Preço Médio card Normal (Sem extras)"
  >
    <div class="col-ext"><div class="avgp-extra">TCGPLAYER</div></div>
    <div class="col-prc col-prc-menor"> </div>
    <div class="col-sep"><div class="circle"></div></div>
    <div id="precousd" class="col-prc col-prc-menor">$ ${
      card_prices[0].tcgplayer_price
    }</div>
    <div class="col-sep"><div class="circle"></div></div>
    <div id="precousdconvertido" class="col-prc col-prc-maior">R$ ${(
      card_prices[0].tcgplayer_price * dollar
    ).toFixed(2)}</div>
  </div>
  <div
    class="row bloco-preco-superior"
    title="Preço Médio cards com Extra: Prismatic Secret Rare"
  >
    <div class="col-ext"><div class="avgp-extra avgp-extra-29">CARDMARKET</div></div>
    <div class="col-prc col-prc-menor"> </div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-menor">€ ${
      card_prices[0].cardmarket_price
    }</div>
    <div class="col-sep"><div class="circle"></div></div>
    <div class="col-prc col-prc-maior">R$ ${(
      card_prices[0].cardmarket_price * euro
    ).toFixed(2)}</div>
  </div>
</div>
        `;
    document.querySelector(".desktop-price-lines-0").innerHTML += element;
    console.log(data);
  } else {
    console.log('Element with class "nome-auxiliar" not found');
  }
});
