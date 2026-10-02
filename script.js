const products = [
  {id:1,name:'NK Essential — White',desc:'Clean everyday fit · 200 GSM',price:599,image:'nk-white.png'},
  {id:2,name:'NK Essential — Black',desc:'Classic street fit · 200 GSM',price:599,image:'nk-black.png'},
  {id:3,name:'NK Essential — Brown',desc:'Earth-tone everyday fit · 200 GSM',price:699,image:'nk-brown.png'},
  {id:4,name:'NK Essential — Grey',desc:'Minimal premium fit · 220 GSM',price:699,image:'nk-grey.png'},
  {id:5,name:'NK Essential — Forest Green',desc:'Deep green premium fit · 220 GSM',price:699,image:'nk-forest.png'},
  {id:6,name:'NK Essential — Sand',desc:'Soft neutral everyday fit · 220 GSM',price:699,image:'nk-sand.png'}
];

let cart = [];

const productRoot = document.getElementById('products');

function money(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/* PRODUCTS */
productRoot.innerHTML = products.map(p => `
  <article class="product">
    <div class="product-visual">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="product-info">
      <div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
      <strong>${money(p.price)}</strong>
    </div>
    <button class="add" data-id="${p.id}">Add to cart</button>
  </article>
`).join('');

/* ADD TO CART */
productRoot.addEventListener('click', e => {
  if (!e.target.matches('.add')) return;

  const product = products.find(
    p => p.id === Number(e.target.dataset.id)
  );

  cart.push(product);
  renderCart();
  openDrawer();
});

/* CART */
function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;

  const root = document.getElementById('cartItems');

  root.innerHTML = cart.length
    ? cart.map((p, i) => `
        <div class="cart-row">
          <span>${p.name}</span>
          <strong>
            ${money(p.price)}
            <button class="remove" data-i="${i}">
              Remove
            </button>
          </strong>
        </div>
      `).join('')
    : '<p class="note">Your cart is empty.</p>';

  document.getElementById('cartTotal').textContent =
    money(cart.reduce((sum, p) => sum + p.price, 0));
}

document.getElementById('cartItems').addEventListener('click', e => {
  if (!e.target.matches('.remove')) return;

  cart.splice(Number(e.target.dataset.i), 1);
  renderCart();
});

/* CART DRAWER */
const drawer = document.getElementById('drawer');

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

document.getElementById('cartButton').onclick = openDrawer;
document.getElementById('closeCart').onclick = closeDrawer;

drawer.addEventListener('click', e => {
  if (e.target === drawer) closeDrawer();
});

/* WHATSAPP */
document.getElementById('checkoutButton').onclick = () => {

  if (!cart.length) {
    alert('Your cart is empty.');
    return;
  }

  const message =
    `NK WEAR ORDER\n\n` +
    cart.map(p => `${p.name} - ${money(p.price)}`).join('\n') +
    `\n\nTotal: ${money(
      cart.reduce((sum, p) => sum + p.price, 0)
    )}`;

  window.location.href =
    'https://wa.me/916380111309?text=' +
    encodeURIComponent(message);
};

/* NEWSLETTER */
document.getElementById('newsletterForm').addEventListener(
  'submit',
  e => {
    e.preventDefault();
    alert('Thanks for joining NK WEAR.');
    e.target.reset();
  }
);

/* MOBILE MENU */
const mobileMenuBtn =
  document.getElementById('mobileMenuBtn');

const mobileMenu =
  document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {

  const isOpen =
    mobileMenu.classList.toggle('open');

  mobileMenuBtn.textContent =
    isOpen ? '×' : '☰';

  mobileMenuBtn.setAttribute(
    'aria-expanded',
    String(isOpen)
  );
});

mobileMenu.querySelectorAll('a').forEach(link => {

  link.addEventListener('click', () => {

    mobileMenu.classList.remove('open');

    mobileMenuBtn.textContent = '☰';

    mobileMenuBtn.setAttribute(
      'aria-expanded',
      'false'
    );

  });

});

/* START */
renderCart();
