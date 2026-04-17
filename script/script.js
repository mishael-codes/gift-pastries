// Scroll reveal observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Section labels inside reveal targets
      const label = entry.target.querySelector('.section-label');
      if (label) label.style.opacity = '1';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .scrap-card, .offering-card, .gallery-item').forEach(el => observer.observe(el));

// Stagger scrapbook cards
document.querySelectorAll('.scrap-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

// Handle WhatsApp Order Form Submission
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  const orderTypeSelect = document.getElementById('orderType');
  const otherTypeGroup = document.getElementById('otherTypeGroup');
  const orderTypeOther = document.getElementById('orderTypeOther');

  // Toggle "Other" text input visibility
  orderTypeSelect.addEventListener('change', function() {
    if (this.value === 'Other') {
      otherTypeGroup.style.display = 'block';
      orderTypeOther.setAttribute('required', 'required');
    } else {
      otherTypeGroup.style.display = 'none';
      orderTypeOther.removeAttribute('required');
      orderTypeOther.value = '';
    }
  });

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('orderName').value.trim();
    const number = document.getElementById('orderNumber').value.trim();
    let type = document.getElementById('orderType').value;
    
    if (type === 'Other') {
      type = document.getElementById('orderTypeOther').value.trim();
    }

    // You can change the phone number below
    const whatsappNumber = "2347014598383";

    // Build the prefilled message
    const message = `Hello, I'm ${name}.\nPhone number: ${number}.\nI would like to order or enquire about: ${type}.\nThank you.`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
}