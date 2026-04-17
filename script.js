// ===========================================
// THREADS BY JOSH - Complete JavaScript
// ===========================================

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.querySelector('.checkout-btn');
const greetingElement = document.getElementById('greeting');
const dateElement = document.getElementById('currentDate');

// Product Database with Local Image Paths
const thriftProducts = [
    { 
        id: 1, 
        name: "90s Vintage Band Tee", 
        category: "tops", 
        condition: "Like New",
        price: 1200, 
        description: "Original 90s rock band t-shirt, excellent condition",
        image: "images/products/90s-band-tee.jpg"
    },
    { 
        id: 2, 
        name: "Vintage Denim Jacket", 
        category: "jackets", 
        condition: "Very Good",
        price: 2800, 
        description: "Light wash Japanese denim, perfect patina",
        image: "images/products/vintage-denim-jacket.jpg"
    },
    { 
        id: 3, 
        name: "Retro Floral Dress", 
        category: "dresses", 
        condition: "Like New",
        price: 1800, 
        description: "1970s bohemian style, unique pattern",
        image: "images/products/retro-floral-dress.jpg"
    },
    { 
        id: 4, 
        name: "Leather Tote Bag", 
        category: "accessories", 
        condition: "Very Good",
        price: 1500, 
        description: "Genuine leather shoulder bag",
        image: "images/products/leather-tote-bag.jpg"
    },
    { 
        id: 5, 
        name: "Corduroy Trousers", 
        category: "bottoms", 
        condition: "Good",
        price: 1400, 
        description: "Brown vintage corduroys",
        image: "images/products/corduroy-trousers.jpg"
    },
    { 
        id: 6, 
        name: "Y2K Windbreaker", 
        category: "jackets", 
        condition: "Like New",
        price: 2200, 
        description: "2000s colorful jacket, retro style",
        image: "images/products/y2k-windbreaker.jpg"
    },
    { 
        id: 7, 
        name: "Mom Jeans", 
        category: "bottoms", 
        condition: "Very Good",
        price: 1600, 
        description: "High-waisted vintage fit jeans",
        image: "images/products/mom-jeans.jpg"
    },
    { 
        id: 8, 
        name: "Vintage Sunglasses", 
        category: "accessories", 
        condition: "Good",
        price: 900, 
        description: "Retro cat-eye style sunglasses",
        image: "images/products/vintage-sunglasses.jpg"
    },
    { 
        id: 9, 
        name: "Knit Sweater", 
        category: "tops", 
        condition: "Like New",
        price: 1900, 
        description: "Cable knit winter sweater",
        image: "images/products/knit-sweater.jpg"
    },
    { 
        id: 10, 
        name: "Plaid Skirt", 
        category: "bottoms", 
        condition: "Very Good",
        price: 1300, 
        description: "School-style plaid skirt",
        image: "images/products/plaid-skirt.jpg"
    },
    { 
        id: 11, 
        name: "Leather Boots", 
        category: "accessories", 
        condition: "Good",
        price: 3400, 
        description: "Vintage cowboy boots",
        image: "images/products/leather-boots.jpg"
    },
    { 
        id: 12, 
        name: "Bomber Jacket", 
        category: "jackets", 
        condition: "Like New",
        price: 2900, 
        description: "Military green bomber jacket",
        image: "images/products/bomber-jacket.jpg"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('threadsByJoshCart')) || [];

// ========== INITIALIZE WEBSITE ==========
document.addEventListener('DOMContentLoaded', function() {
    initDynamicGreeting();
    initThemeToggle();
    initCart();
    initProductGrid();
    initFilters();
    initResetFilters();
    initContactForm();
    initWhatsAppIntegration();
    initImageSlider();
    initHeroSlider();
    initNewsletter();
    initEnhancedFeatures();
    
    console.log('🚀 Threads by Josh - Fully Initialized!');
});

// ========== 1. DYNAMIC GREETING & DATE ==========
function initDynamicGreeting() {
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) greeting = "Habari ya Asubuhi, Thrifter!";
        else if (hour < 18) greeting = "Habari ya Mchana, Thrifter!";
        else greeting = "Habari ya Jioni, Thrifter!";
        
        greetingElement.textContent = greeting;
    }
    
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Africa/Nairobi'
        };
        dateElement.textContent = new Date().toLocaleDateString('en-KE', options);
    }
}

// ========== 2. THEME TOGGLE ==========
function initThemeToggle() {
    if (themeToggle) {
        const savedTheme = localStorage.getItem('threadsByJoshTheme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('threadsByJoshTheme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('threadsByJoshTheme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            showNotification('Theme switched to ' + (document.body.classList.contains('dark-mode') ? 'dark' : 'light') + ' mode', 'info');
        });
    }
}

// ========== 3. SHOPPING CART SYSTEM ==========
function initCart() {
    // Open cart when cart icon is clicked
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            renderCartItems();
        });
    }
    
    // Close cart
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your thrift basket is empty!', 'warning');
                return;
            }
            
            const total = calculateTotal();
            const shipping = total >= 5000 ? 0 : 200;
            const grandTotal = total + shipping;
            
            showNotification('Processing your order...', 'info');
            
            setTimeout(() => {
                const paymentMessage = `Order Summary:\n` +
                    `Items: KSh ${total.toLocaleString()}\n` +
                    `Shipping: ${shipping === 0 ? 'FREE' : `KSh ${shipping}`}\n` +
                    `Total: KSh ${grandTotal.toLocaleString()}\n\n` +
                    `Thank you for shopping with Threads by Josh!`;
                
                showNotification(paymentMessage, 'success');
                
                // Clear cart after checkout
                cart = [];
                saveCart();
                updateCartCount();
                renderCartItems();
                closeCart();
            }, 1500);
        });
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Add event listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
        
        if (e.target.classList.contains('remove-item') || 
            e.target.closest('.remove-item')) {
            const removeBtn = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const productId = parseInt(removeBtn.dataset.id);
            removeFromCart(productId);
        }
    });
}

function addToCart(productId) {
    const product = thriftProducts.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            condition: product.condition,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#25D366';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
    
    // Update cart sidebar if open
    if (cartSidebar.classList.contains('active')) {
        renderCartItems();
    }
    
    showNotification(`Added ${product.name} to basket!`, 'success');
}

function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCartItems();
        showNotification(`Removed ${item.name} from basket`, 'info');
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function renderCartItems() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your thrift basket is empty</p>';
        cartTotalElement.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}');"></div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-condition">${item.condition}</p>
                <p class="cart-item-price">KSh ${item.price.toLocaleString()} × ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    cartTotalElement.textContent = calculateTotal().toLocaleString();
}

function saveCart() {
    localStorage.setItem('threadsByJoshCart', JSON.stringify(cart));
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// ========== 4. PRODUCT GRID & FILTERING ==========
function initProductGrid() {
    const productGrid = document.querySelector('.products-grid.full-grid');
    if (!productGrid) return;
    
    renderProducts(thriftProducts, productGrid);
}

function renderProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-condition="${product.condition}" data-price="${product.price}">
            <div class="product-image" style="background-image: url('${product.image}');">
                <span class="product-badge">${product.condition}</span>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Add to Bag
                </button>
            </div>
        </div>
    `).join('');
}

function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (conditionFilter) {
        conditionFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const price = document.getElementById('priceFilter')?.value || 'all';
    const condition = document.getElementById('conditionFilter')?.value || 'all';
    
    let filtered = [...thriftProducts];
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by price range
    if (price !== 'all') {
        switch(price) {
            case 'under1000':
                filtered = filtered.filter(product => product.price < 1000);
                break;
            case '1000-2500':
                filtered = filtered.filter(product => product.price >= 1000 && product.price <= 2500);
                break;
            case 'over2500':
                filtered = filtered.filter(product => product.price > 2500);
                break;
        }
    }
    
    // Filter by condition
    if (condition !== 'all') {
        filtered = filtered.filter(product => product.condition === condition);
    }
    
    // Update product grid
    const productGrid = document.querySelector('.products-grid.full-grid');
    if (productGrid) {
        if (filtered.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No thrift finds match your filters. Try different criteria!</p>';
        } else {
            renderProducts(filtered, productGrid);
        }
    }
}

// ========== 5. RESET FILTERS ==========
function initResetFilters() {
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('categoryFilter').value = 'all';
            document.getElementById('priceFilter').value = 'all';
            document.getElementById('conditionFilter').value = 'all';
            filterProducts();
            showNotification('Filters reset to default', 'info');
        });
    }
}

// ========== 6. CONTACT FORM VALIDATION ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message').value.trim();
        
        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');
        const successMessage = document.getElementById('formSuccess');
        
        let isValid = true;
        
        // Clear previous errors
        if (nameError) nameError.textContent = '';
        if (phoneError) phoneError.textContent = '';
        if (messageError) messageError.textContent = '';
        
        // Validate name
        if (!name) {
            if (nameError) nameError.textContent = 'Please enter your name';
            isValid = false;
        } else if (name.length < 2) {
            if (nameError) nameError.textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate phone (Kenyan format)
        if (phone && !isValidKenyanPhone(phone)) {
            if (phoneError) phoneError.textContent = 'Please enter a valid Kenyan phone number (e.g., 0712 345 678)';
            isValid = false;
        }
        
        // Validate email if provided
        if (email && !isValidEmail(email)) {
            const emailError = document.getElementById('emailError');
            if (emailError) emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            if (messageError) messageError.textContent = 'Please enter your message';
            isValid = false;
        } else if (message.length < 10) {
            if (messageError) messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            if (successMessage) {
                successMessage.textContent = 'Asante! Your message has been sent. Josh will get back to you soon.';
                successMessage.style.display = 'block';
            }
            
            contactForm.reset();
            showNotification('Message sent successfully! We\'ll respond soon.', 'success');
            
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }
    });
}

function isValidKenyanPhone(phone) {
    const regex = /^(07\d{8}|011\d{7})$/;
    const cleanPhone = phone.replace(/\s/g, '');
    return regex.test(cleanPhone);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========== 7. WHATSAPP INTEGRATION ==========
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.href.includes('wa.me')) {
                e.preventDefault();
                const phone = '254113767195';
                const message = 'Hello Threads by Josh! I have a question about your thrift store.';
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            }
        });
    });
}

// ========== 8. IMAGE SLIDER ==========
function initImageSlider() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        });
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.image-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
    updateSlider();
}

// ========== 9. HERO SLIDER ==========
function initHeroSlider() {
    const heroSlides = document.querySelector('.hero-slides');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slider-dot');
    
    if (!heroSlides || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let heroInterval;
    
    function updateHeroSlider() {
        heroSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextHeroSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlider();
    }
    
    function startHeroAutoSlide() {
        heroInterval = setInterval(nextHeroSlide, 5000);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateHeroSlider();
            resetHeroAutoSlide();
        });
    });
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(heroInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            startHeroAutoSlide();
        });
    }
    
    function resetHeroAutoSlide() {
        clearInterval(heroInterval);
        startHeroAutoSlide();
    }
    
    startHeroAutoSlide();
    updateHeroSlider();
}

// ========== 10. NEWSLETTER ==========
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value;
        
        if (isValidEmail(email)) {
            showNotification('Thanks for subscribing! You\'ll hear from us soon.', 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// ========== 11. ENHANCED FEATURES ==========
function initEnhancedFeatures() {
    enhanceProductCards();
    enhanceCategoryCards();
    
    // Category navigation
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            if (category && category !== 'all') {
                filterProductsByCategory(category);
            }
        });
    });
    
    // Category card clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;
            if (category) {
                window.location.href = `products.html?category=${category}`;
            }
        });
    });
    
    // Add smooth animations
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
}

function enhanceProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

function enhanceCategoryCards() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const image = this.querySelector('.category-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const image = this.querySelector('.category-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product-card');
    const featuredSection = document.querySelector('.featured-products');
    
    if (!featuredSection) return;
    
    const categoryNames = {
        'tops': 'Tops & Shirts',
        'bottoms': 'Bottoms',
        'dresses': 'Dresses',
        'jackets': 'Jackets',
        'accessories': 'Accessories'
    };
    
    const sectionTitle = featuredSection.querySelector('h2');
    if (sectionTitle && category !== 'all') {
        sectionTitle.textContent = categoryNames[category] || 'Featured Finds';
    }
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 100);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// ========== 12. NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#25D366' : type === 'warning' ? '#FFA726' : type === 'error' ? '#FF4444' : '#FF3B30'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// ========== 13. ADDITIONAL UTILITIES ==========
function formatKSH(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0
    }).format(amount);
}

// Check URL parameters for category filtering
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && document.getElementById('categoryFilter')) {
        document.getElementById('categoryFilter').value = category;
        filterProducts();
    }
}

// Check URL params on products page
if (window.location.pathname.includes('products.html')) {
    document.addEventListener('DOMContentLoaded', checkUrlParams);
}

// Add loading animation
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.product-card, .category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
        closeCart();
    }
    
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        if (themeToggle) themeToggle.click();
    }
});