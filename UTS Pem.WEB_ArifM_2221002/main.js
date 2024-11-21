// Data Produk
const products = [
    { id: 1, name: 'Susu Kambing', price: 12000 },
    { id: 2, name: 'Roti Vanilla', price: 10000 },
    { id: 3, name: 'Roti Coklat', price: 10000 },
    { id: 4, name: 'Roti Abon', price: 15000 },
    { id: 5, name: 'Roti Endul', price: 10000 },
  ];
  const cart = [];
  
  // Tampilkan Produk
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
      productList.innerHTML += `
        <div class="product">
          <h3>${product.name}</h3>
          <p>Harga: ${product.price} Rupiah</p>
          <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        </div>
      `;
    });
  }
  
  // Tambah Produk ke Keranjang
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    displayCart();
  }
  
  // Tampilkan Keranjang
  function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
      cartItems.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.price} Rupiah</td>
          <td>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            ${item.quantity}
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
          </td>
          <td>${item.price * item.quantity} Rupiah</td>
          <td><button onclick="removeFromCart(${item.id})">Hapus</button></td>
        </tr>
      `;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total;
  }
  
  // Perbarui Jumlah Produk di Keranjang
  function updateQuantity(productId, delta) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity += delta;
      if (cartItem.quantity <= 0) {
        removeFromCart(productId);
      }
    }
    displayCart();
  }
  
  // Hapus Produk dari Keranjang
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) cart.splice(index, 1);
    displayCart();
  }
  
  // Checkout
  function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total === 0) {
      alert('Keranjang Anda kosong!');
      return;
    }
    alert(`Terima kasih! Total pembayaran Anda: ${total} Rupiah`);
    cart.length = 0; // Kosongkan keranjang
    displayCart();
  }
  
  // Inisialisasi
  displayProducts();
  displayCart();
  