/* =========================================================
   كيان العقارية - KAYAN REAL ESTATE
   Master Scripts - RTL Interactive Features
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ================= MOBILE MENU ================= */
    const nav = document.getElementById('kayanNav');
    const toggleBtn = document.querySelector('.kayan-mobile-toggle');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.toggle('open');
        });

        // Close on click outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                nav.classList.remove('open');
            }
        });
    }

    /* ================= SCROLL TOP ================= */
    const kayanScrollTop = document.getElementById('kayanScrollTop');

    if (kayanScrollTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                kayanScrollTop.classList.add('show');
            } else {
                kayanScrollTop.classList.remove('show');
            }
        });

        kayanScrollTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ================= SMOOTH SCROLL FOR HASH LINKS ================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (nav) nav.classList.remove('open');
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                // Ignore invalid selectors
            }
        });
    });

    /* ================= PROJECT FILTERS (projects.html) ================= */
    const filterButtons = document.querySelectorAll('.kayan-filter-btn');
    const projectCards = document.querySelectorAll('.kayan-filterable-project');
    const searchInput = document.getElementById('projectSearchInput');

    function applyProjectFilter() {
        const activeBtn = document.querySelector('.kayan-filter-btn.active');
        const filterVal = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';

        let visibleCount = 0;

        projectCards.forEach(function (card) {
            const cardCategory = card.getAttribute('data-category') || '';
            const cardStatus = card.getAttribute('data-status') || '';
            const cardTitle = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
            const cardLocation = (card.querySelector('.kayan-location') ? card.querySelector('.kayan-location').textContent : '').toLowerCase();

            const matchesCategory = (filterVal === 'all') || (cardCategory === filterVal) || (cardStatus === filterVal);
            const matchesSearch = !searchVal || cardTitle.includes(searchVal) || cardLocation.includes(searchVal);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn .3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const countEl = document.getElementById('projectsCount');
        if (countEl) countEl.textContent = visibleCount;
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                applyProjectFilter();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', applyProjectFilter);
        }

        // Check URL params (?status=current or ?status=delivered or ?cat=...)
        const urlParams = new URLSearchParams(window.location.search);
        const statusParam = urlParams.get('status') || urlParams.get('cat');
        if (statusParam) {
            const matchedBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === statusParam);
            if (matchedBtn) {
                filterButtons.forEach(b => b.classList.remove('active'));
                matchedBtn.classList.add('active');
            }
        }

        applyProjectFilter();
    }

    /* ================= SINGLE PROJECT GALLERY (project-single.html) ================= */
    const mainGalleryImg = document.getElementById('mainGalleryImg');
    const galleryThumbs = document.querySelectorAll('.kayan-gallery-thumb');

    if (mainGalleryImg && galleryThumbs.length > 0) {
        galleryThumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                galleryThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const newSrc = this.getAttribute('data-img');
                if (newSrc) {
                    mainGalleryImg.style.opacity = '0.4';
                    setTimeout(function () {
                        mainGalleryImg.src = newSrc;
                        mainGalleryImg.style.opacity = '1';
                    }, 150);
                }
            });
        });
    }

    /* ================= UNIT PLANS TABS (project-single.html) ================= */
    const unitTabs = document.querySelectorAll('.kayan-unit-tab');
    const unitDetails = document.querySelectorAll('.kayan-unit-detail-item');

    if (unitTabs.length > 0 && unitDetails.length > 0) {
        unitTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');

                unitTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                unitDetails.forEach(function (item) {
                    if (item.id === targetId) {
                        item.style.display = 'grid';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ================= INTERACTIVE INSTALLMENT CALCULATOR ================= */
    const calcPriceSlider = document.getElementById('calcPriceSlider');
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const calcDownPaymentOpts = document.querySelectorAll('.downpayment-opt');
    const calcYearsOpts = document.querySelectorAll('.years-opt');
    const resDownPayment = document.getElementById('resDownPayment');
    const resMonthly = document.getElementById('resMonthly');
    const resCashDiscount = document.getElementById('resCashDiscount');

    let currentPrice = 3800000;
    let currentDownPercent = 10;
    let currentYears = 7;

    function formatEGP(num) {
        return Math.round(num).toLocaleString('ar-EG') + ' ج.م';
    }

    function calculateInstallments() {
        if (!calcPriceSlider) return;

        currentPrice = parseInt(calcPriceSlider.value, 10);
        if (calcPriceDisplay) {
            calcPriceDisplay.textContent = formatEGP(currentPrice);
        }

        const downPaymentAmount = currentPrice * (currentDownPercent / 100);
        const remainingAmount = currentPrice - downPaymentAmount;
        const totalMonths = currentYears * 12;
        const monthlyInstallment = remainingAmount / totalMonths;
        const cashDiscount = currentPrice * 0.20; // 20% cash discount

        if (resDownPayment) resDownPayment.textContent = formatEGP(downPaymentAmount);
        if (resMonthly) resMonthly.textContent = formatEGP(monthlyInstallment);
        if (resCashDiscount) resCashDiscount.textContent = formatEGP(cashDiscount);
    }

    if (calcPriceSlider) {
        calcPriceSlider.addEventListener('input', calculateInstallments);

        calcDownPaymentOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                calcDownPaymentOpts.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                currentDownPercent = parseInt(this.getAttribute('data-value'), 10);
                calculateInstallments();
            });
        });

        calcYearsOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                calcYearsOpts.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                currentYears = parseInt(this.getAttribute('data-value'), 10);
                calculateInstallments();
            });
        });

        calculateInstallments();
    }

    /* ================= FAQ ACCORDION (contact.html) ================= */
    const faqItems = document.querySelectorAll('.kayan-faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(function (item) {
            const question = item.querySelector('.kayan-faq-q');
            if (question) {
                question.addEventListener('click', function () {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    /* ================= TOAST NOTIFICATION & FORM HANDLERS ================= */
    function showToast(message) {
        let toast = document.getElementById('kayanToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'kayanToast';
            toast.className = 'kayan-toast';
            document.body.appendChild(toast);
        }

        toast.innerHTML = '<span>✨</span> <div>' + message + '</div>';
        toast.classList.add('show');

        setTimeout(function () {
            toast.classList.remove('show');
        }, 4500);
    }

    const forms = document.querySelectorAll('form[data-kayan-ajax]');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'جاري الإرسال...';
            }

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                form.reset();
                showToast('شكراً لتواصلكم مع كيان العقارية! تم استلام طلبكم وسيتواصل معكم مستشارنا في غضون 30 دقيقة.');
            }, 800);
        });
    });

});

// Global fallback for mobile menu if called inline
function kayanMenu() {
    const nav = document.getElementById('kayanNav');
    if (nav) nav.classList.toggle('open');
}
