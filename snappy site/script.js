
const PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = (path) => `${PROXY}${encodeURIComponent('http://43.205.110.71:8000' + path)}`;

const categoryEl = document.getElementById('category-list');
const productGridEl = document.getElementById('product-grid');
const cache = { categories: null, items: {} };
async function fetchItems(categoryId) {
    if (cache.items[categoryId]) return cache.items[categoryId];
    try {
        const res = await fetch(API_URL(`/categories/${encodeURIComponent(categoryId)}/items`));

        const data = await res.json();
        cache.items[categoryId] = Array.isArray(data) ? data : (data.items || []);
        return cache.items[categoryId];

    }
    catch (err) {
        console.error(`Error fetching items ${categoryId}:`, err);
        return [];
    }
};
async function fetchCategories() {
    if (cache.categories) return cache.categories;
    try {
       const res = await fetch(API_URL('/categories'));


        const data = await res.json();
        cache.categories = data;
        return data;

    }
    catch (err) {
        console.error('Error fetching categories:', err);
        return [];
    }
};
function renderCategories(categories) {
    categoryEl.innerHTML = '';
    let categoryId, name;
    categories.forEach(element => {
        for (const key in element) {
            if (typeof element[key] === 'string') {
                categoryId = element[key];
                name = element[key];
                break;
            }
        }
        const btn = document.createElement('button');
        btn.textContent = name;
        btn.addEventListener('click', () => loadCategoryItems(categoryId));
        categoryEl.appendChild(btn)
    });

}
function renderItems(items) {
    productGridEl.innerHTML = '';
    if (!Array.isArray(items) || items.length === 0) {
        productGridEl.innerHTML = '<p>No items found in this category.</p>';
        return;
    }
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const img = document.createElement('img');
        img.src = `https://picsum.photos/seed/${item.id || Math.random()}/200`;

        const title = document.createElement('h3');
        title.textContent = item.name || 'Unnamed';
        const price = document.createElement('p');
        price.className = 'price';
        const numericPrice = Number(item.price);
        price.textContent = `₹${numericPrice.toFixed(2)}`;
        card.append(img, title);
        if (price.textContent) {
            card.appendChild(price);
        }
        productGridEl.appendChild(card);
    })
};
async function loadCategoryItems(categoryId) {
    const items = await fetchItems(categoryId);
    renderItems(items);
};
async function init() {
 let categories = await fetchCategories();
 renderCategories (categories);
 let firstel = categories[0];
let first ;
 for (const key in firstel) {
       if ( typeof firstel[key]=== 'string' ){
        first = firstel[key];
            break;
       }
    }
    if (first) {
        loadCategoryItems(first);
    }

}
document.addEventListener('DOMContentLoaded', init);