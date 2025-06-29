// NB CARZONE – site‑wide interactivity (v5)

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- NAV HIGHLIGHT ---------- */
  const cur = location.pathname.split('/').pop();
  document.querySelectorAll('nav a')
    .forEach(a => a.classList.toggle('active-page', a.getAttribute('href') === cur));

  /* ---------- PRICE TABLE ---------- */
  const pricing = {
    corolla: { buy: 22000, rent: 40 },
    camry:   { buy: 26000, rent: 45 },
    prius:   { buy: 28000, rent: 48 },
    civic:   { buy: 23000, rent: 42 },
    accord:  { buy: 27000, rent: 47 },
    focus:   { buy: 21000, rent: 38 },
    fusion:  { buy: 25000, rent: 43 },
    '3series':{ buy: 41000, rent: 75 },
    '5series':{ buy: 55000, rent: 95 },
    model3:  { buy: 39000, rent: 70 },
    modely:  { buy: 47000, rent: 82 },
    models:  { buy: 78000, rent:120 }
  };

  /* ---------- PURCHASE PAGE ---------- */
  const modelSel = document.getElementById('model');
  const priceTag = document.getElementById('priceInfo');
  if (modelSel && priceTag) {
    // Pre‑select via ?model=
    const qsModel = new URLSearchParams(location.search).get('model');
    if (qsModel) modelSel.value = qsModel;

    const updatePurchasePrice = () => {
      const key = modelSel.value;
      priceTag.textContent = key ? `$${pricing[key].buy.toLocaleString()}` : '';
    };
    modelSel.addEventListener('change', updatePurchasePrice);
    updatePurchasePrice();
  }

  /* ---------- RENT PAGE ---------- */
  const rentModelSel = document.getElementById('rentModel');
  const rentPriceTag = document.getElementById('rentPrice');
  const totalTag     = document.getElementById('totalPrice');
  const durInput     = document.getElementById('duration');

  if (rentModelSel && rentPriceTag && totalTag && durInput) {
    const updateRentPrice = () => {
      const key = rentModelSel.value;
      rentPriceTag.textContent = key ? `$${pricing[key].rent}/day` : '--';
      updateTotal();
    };
    const updateTotal = () => {
      const key = rentModelSel.value;
      const days = parseInt(durInput.value, 10);
      if (key && days > 0) {
        totalTag.textContent = `$${(pricing[key].rent * days).toLocaleString()}`;
      } else totalTag.textContent = '--';
    };
    rentModelSel.addEventListener('change', updateRentPrice);
    durInput.addEventListener('input', updateTotal);
    updateRentPrice();
  }

  /* ---------- FORM SUBMISSION FEEDBACK ---------- */
  document.querySelectorAll('form').forEach(f => {
    f.addEventListener('submit', e => {
      if (!f.checkValidity()) return;
      e.preventDefault();
      // Custom message for rent form with total
      if (totalTag && f.contains(totalTag)) {
        alert(`Thanks! Your rental total is ${totalTag.textContent}.`);
      } else {
        alert('Thanks! Your form was submitted successfully.');
      }
      f.reset();
      priceTag  && (priceTag.textContent  = '');
      rentPriceTag && (rentPriceTag.textContent = '--');
      totalTag  && (totalTag.textContent  = '--');
    });
  });
});
