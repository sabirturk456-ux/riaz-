// ============ DEFAULT PRODUCTS ============
const defaultProducts = [
  {id:1,name:"Royal Lawn Suit - Emerald",category:"Lawn",price:4500,oldPrice:6000,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500",desc:"Premium 3-piece lawn suit with embroidered patch, chiffon dupatta, and dyed trousers.",featured:true},
  {id:2,name:"Luxury Chiffon - Ruby Red",category:"Chiffon",price:8500,oldPrice:11000,image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",desc:"Heavy embroidered chiffon with sequin work. Perfect for weddings and formal events.",featured:true},
  {id:3,name:"Winter Khaddar - Classic",category:"Khaddar",price:5500,oldPrice:7000,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&sat=-30",desc:"Warm khaddar fabric with traditional embroidery. Ideal for winter season.",featured:true},
  {id:4,name:"Pure Silk - Golden Touch",category:"Silk",price:12500,oldPrice:15000,image:"https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500",desc:"Pure silk fabric with gold thread work. Luxury collection for special occasions.",featured:true},
  {id:5,name:"Linen Elegance - Ivory",category:"Linen",price:3800,oldPrice:5000,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&hue=30",desc:"Soft linen fabric perfect for summer. Breathable and comfortable."},
  {id:6,name:"Lawn Printed - Floral",category:"Lawn",price:3200,oldPrice:4500,image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&sat=50",desc:"Beautiful floral printed lawn suit. 3-piece unstitched collection."},
  {id:7,name:"Chiffon Party Wear",category:"Chiffon",price:9800,oldPrice:12500,image:"https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&hue=200",desc:"Designer chiffon with heavy work. Perfect for parties and events."},
  {id:8,name:"Khaddar Embroidered",category:"Khaddar",price:6200,oldPrice:8000,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&sat=-50",desc:"Hand embroidered khaddar suit. Traditional design with modern touch."},
  {id:9,name:"Silk Bridal Collection",category:"Silk",price:18500,oldPrice:22000,image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&hue=330",desc:"Bridal silk with zari work. Exclusive collection for brides."},
  {id:10,name:"Linen Casual - Blue",category:"Linen",price:3500,oldPrice:4800,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&hue=200",desc:"Casual linen suit in blue. Perfect for everyday wear."},
  {id:11,name:"Lawn Digital Print",category:"Lawn",price:3800,oldPrice:5200,image:"https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&hue=100",desc:"Digital printed lawn with vibrant colors. Summer special."},
  {id:12,name:"Chiffon Formal",category:"Chiffon",price:7500,oldPrice:9500,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&hue=280",desc:"Formal chiffon suit with elegant embroidery."},
];

// ============ STATE ============
let products = JSON.parse(localStorage.getItem('baghgadi_products')) || defaultProducts;
let currentFilter = 'all';

function saveProducts(){localStorage.setItem('baghgadi_products',JSON.stringify(products))}

// ============ RENDER PRODUCTS ============
function renderProducts(list,containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  if(list.length === 0){
    container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400"><i class="fas fa-box-open text-5xl mb-4"></i><p>No products found</p></div>';
    return;
  }
  container.innerHTML = list.map((p,i) => `
    <div class="product-card rounded-2xl reveal" style="transition-delay:${i*0.05}s">
      <div class="relative overflow-hidden aspect-[3/4]">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/500x700/1a1a1a/d4af37?text=Baghgadi'">
        ${p.oldPrice ? `<span class="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">-${Math.round((1-p.price/p.oldPrice)*100)}%</span>` : ''}
        ${p.featured ? `<span class="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold"><i class="fas fa-star"></i> Featured</span>` : ''}
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition flex items-end p-4">
          <button onclick="viewProduct(${p.id})" class="btn-gold w-full py-2 rounded-full text-sm">Quick View</button>
        </div>
      </div>
      <div class="p-5">
        <p class="text-xs text-yellow-400 mb-1">${p.category}</p>
        <h3 class="serif text-lg font-semibold mb-2 line-clamp-1">${p.name}</h3>
        <div class="flex items-center gap-2">
          <span class="gold-text text-xl font-bold">Rs ${p.price.toLocaleString()}</span>
          ${p.oldPrice ? `<span class="text-gray-500 line-through text-sm">Rs ${p.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="flex gap-2 mt-4">
          <a href="https://wa.me/923102125634?text=Hi%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(p.name)}%20-%20Rs%20${p.price}" target="_blank" class="btn-gold flex-1 py-2 rounded-full text-sm text-center">
            <i class="fab fa-whatsapp mr-1"></i>Order
          </a>
          <button onclick="viewProduct(${p.id})" class="btn-outline px-4 py-2 rounded-full text-sm">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  initReveal();
}

function refreshAll(){
  const featured = products.filter(p => p.featured).slice(0,4);
  const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
  renderProducts(featured.length ? featured : products.slice(0,4),'featuredProducts');
  renderProducts(filtered,'allProducts');
  updateStats();
  renderAdminProducts();
}

function filterCategory(cat){
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('btn-gold');
    b.classList.add('btn-outline');
  });
  event?.target?.classList?.remove('btn-outline');
  event?.target?.classList?.add('btn-gold');
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered,'allProducts');
}

// ============ VIEW PRODUCT ============
function viewProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalContent').innerHTML = `
    <img src="${p.image}" class="w-full h-80 object-cover rounded-xl mb-6" onerror="this.src='https://via.placeholder.com/800x400/1a1a1a/d4af37?text=Baghgadi'">
    <div class="flex items-center gap-3 mb-4">
      <span class="bg-yellow-400/20 text-yellow-400 text-xs px-3 py-1 rounded-full">${p.category}</span>
      ${p.featured ? `<span class="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">Featured</span>` : ''}
    </div>
    <p class="text-gray-300 mb-6">${p.desc || 'Premium quality fabric from Baghgadi Fabrics.'}</p>
    <div class="flex items-center gap-3 mb-6">
      <span class="gold-text text-4xl serif font-bold">Rs ${p.price.toLocaleString()}</span>
      ${p.oldPrice ? `<span class="text-gray-500 line-through text-xl">Rs ${p.oldPrice.toLocaleString()}</span>` : ''}
    </div>
    <div class="flex gap-3">
      <a href="https://wa.me/923102125634?text=Hi%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(p.name)}%20-%20Rs%20${p.price}" target="_blank" class="btn-gold flex-1 py-3 rounded-full text-center">
        <i class="fab fa-whatsapp mr-2"></i>Order on WhatsApp
      </a>
      <a href="tel:03102125634" class="btn-outline px-6 py-3 rounded-full">
        <i class="fas fa-phone"></i>
      </a>
    </div>
  `;
  document.getElementById('productModal').classList.add('active');
}
function closeModal(){document.getElementById('productModal').classList.remove('active')}

// ============ PAGE NAVIGATION ============
function showPage(page){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,100);
}

function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('hidden')}

// ============ ADMIN ============
function adminLogin(e){
  e.preventDefault();
  const pass = document.getElementById('adminPass').value;
  if(pass === 'admin123'){
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    refreshAll();
  } else {
    alert('Wrong password! Default: admin123');
  }
}
function adminLogout(){
  document.getElementById('adminLogin').classList.remove('hidden');
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('adminPass').value = '';
}

function updateStats(){
  document.getElementById('statTotal').textContent = products.length;
  const cats = [...new Set(products.map(p => p.category))];
  document.getElementById('statCat').textContent = cats.length;
  const avg = products.length ? Math.round(products.reduce((s,p) => s+p.price,0)/products.length) : 0;
  document.getElementById('statAvg').textContent = 'Rs ' + avg.toLocaleString();
  document.getElementById('statFeat').textContent = products.filter(p => p.featured).length;
}

function renderAdminProducts(){
  const c = document.getElementById('adminProducts');
  if(!c) return;
  c.innerHTML = products.map(p => `
    <div class="flex items-center gap-4 p-4 bg-black/50 rounded-xl">
      <img src="${p.image}" class="w-16 h-16 rounded-lg object-cover" onerror="this.src='https://via.placeholder.com/100/1a1a1a/d4af37?text=B'">
      <div class="flex-1">
        <h4 class="font-semibold">${p.name}</h4>
        <p class="text-xs text-gray-400">${p.category} ${p.featured ? '• <span class="text-yellow-400">Featured</span>' : ''}</p>
        <p class="gold-text font-bold">Rs ${p.price.toLocaleString()}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="editProduct(${p.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"><i class="fas fa-edit"></i></button>
        <button onclick="deleteProduct(${p.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function addProduct(){
  document.getElementById('editTitle').textContent = 'Add New Product';
  document.getElementById('editId').value = '';
  document.getElementById('editName').value = '';
  document.getElementById('editCategory').value = 'Lawn';
  document.getElementById('editPrice').value = '';
  document.getElementById('editOldPrice').value = '';
  document.getElementById('editImage').value = '';
  document.getElementById('editDesc').value = '';
  document.getElementById('editFeatured').checked = false;
  document.getElementById('editModal').classList.add('active');
}

function editProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  document.getElementById('editTitle').textContent = 'Edit Product';
  document.getElementById('editId').value = p.id;
  document.getElementById('editName').value = p.name;
  document.getElementById('editCategory').value = p.category;
  document.getElementById('editPrice').value = p.price;
  document.getElementById('editOldPrice').value = p.oldPrice || '';
  document.getElementById('editImage').value = p.image;
  document.getElementById('editDesc').value = p.desc || '';
  document.getElementById('editFeatured').checked = p.featured || false;
  document.getElementById('editModal').classList.add('active');
}

function saveProduct(e){
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const data = {
    name: document.getElementById('editName').value,
    category: document.getElementById('editCategory').value,
    price: parseInt(document.getElementById('editPrice').value),
    oldPrice: parseInt(document.getElementById('editOldPrice').value) || null,
    image: document.getElementById('editImage').value,
    desc: document.getElementById('editDesc').value,
    featured: document.getElementById('editFeatured').checked
  };
  if(id){
    const idx = products.findIndex(p => p.id == id);
    products[idx] = {...products[idx],...data};
  } else {
    data.id = Date.now();
    products.push(data);
  }
  saveProducts();
  refreshAll();
  closeEditModal();
  alert('Product saved successfully!');
}

function deleteProduct(id){
  if(!confirm('Delete this product?')) return;
  products = products.filter(p => p.id !== id);
  saveProducts();
  refreshAll();
}

function closeEditModal(){document.getElementById('editModal').classList.remove('active')}

// ============ CONTACT FORM ============
function sendMessage(e){
  e.preventDefault();
  alert('Thank you! Your message has been sent. We will contact you soon.');
  e.target.reset();
}

// ============ SCROLL REVEAL ============
function initReveal(){
  const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-zoom');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add('active');
      }
    });
  },{threshold:0.15});
  els.forEach(el => obs.observe(el));
}

// ============ PARTICLES ============
function createParticles(){
  const c = document.getElementById('particles');
  if(!c) return;
  for(let i=0;i<20;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*6+'s';
    p.style.animationDuration = (4+Math.random()*4)+'s';
    c.appendChild(p);
  }
}

// ============ LOADER ============
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('hide');
  },800);
  refreshAll();
  initReveal();
  createParticles();
});

// Close modals on outside click
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click',e => {
    if(e.target === m) m.classList.remove('active');
  });
});
