/* =========================================================
   كيان العقارية - KAYAN REAL ESTATE
   Master Scripts - High-Performance Mobile & Desktop JS
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ================= MOBILE BURGER MENU (TOUCH & DESKTOP) ================= */
    const nav = document.getElementById('kayanNav');
    const toggleBtn = document.getElementById('kayanMobileToggle') || document.querySelector('.kayan-mobile-toggle');

    function toggleMobileMenu(e) {
        if (e && e.cancelable) {
            e.preventDefault();
        }
        if (!nav) return;

        const isOpen = nav.classList.toggle('open');
        document.body.classList.toggle('kayan-menu-open', isOpen);

        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    if (toggleBtn && nav) {
        let lastToggleTime = 0;

        function handleMenuToggle(e) {
            const now = Date.now();
            // Prevent synthetic double events (tap -> click within 350ms on mobile)
            if (now - lastToggleTime < 350) {
                if (e.cancelable) e.preventDefault();
                return;
            }
            lastToggleTime = now;
            toggleMobileMenu(e);
        }

        // Support both tap/touchend and click for zero delay on mobile
        toggleBtn.addEventListener('click', handleMenuToggle);
        toggleBtn.addEventListener('touchend', handleMenuToggle, { passive: false });

        // Close on clicking/tapping outside
        function closeMenuOutside(e) {
            if (nav.classList.contains('open')) {
                if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                    nav.classList.remove('open');
                    document.body.classList.remove('kayan-menu-open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
        document.addEventListener('click', closeMenuOutside);
        document.addEventListener('touchend', closeMenuOutside);

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                document.body.classList.remove('kayan-menu-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close when clicking internal links
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                const hasSub = this.nextElementSibling && this.nextElementSibling.classList.contains('kayan-dropdown');
                if (!hasSub) {
                    nav.classList.remove('open');
                    document.body.classList.remove('kayan-menu-open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // Global fallback for any inline call
    window.kayanMenu = function (e) {
        toggleMobileMenu(e);
    };

    /* ================= SCROLL TOP BUTTON ================= */
    const kayanScrollTop = document.getElementById('kayanScrollTop');

    if (kayanScrollTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 350) {
                kayanScrollTop.classList.add('show');
            } else {
                kayanScrollTop.classList.remove('show');
            }
        }, { passive: true });

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
    const projectsGrid = document.querySelector('.kayan-project-grid');

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
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const countEl = document.getElementById('projectsCount');
        if (countEl) countEl.textContent = visibleCount;

        // No projects placeholder
        let noResultsEl = document.getElementById('noProjectsMessage');
        if (visibleCount === 0) {
            if (!noResultsEl && projectsGrid) {
                noResultsEl = document.createElement('div');
                noResultsEl.id = 'noProjectsMessage';
                noResultsEl.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #111; border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; margin: 20px 0;';
                noResultsEl.innerHTML = '<i class="fa-solid fa-magnifying-glass" style="font-size:32px; color:var(--kayan-gold); margin-bottom:12px; display:block;"></i><h3 style="color:#fff; margin-bottom:8px;">لا توجد مشروعات مطابقة للبحث</h3><p style="color:#aaa; font-size:14px; margin:0;">يرجى تجربة كلمات بحث أخرى أو اختيار تصنيف مختلف.</p>';
                projectsGrid.appendChild(noResultsEl);
            } else if (noResultsEl) {
                noResultsEl.style.display = 'block';
            }
        } else if (noResultsEl) {
            noResultsEl.style.display = 'none';
        }
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
            function activateThumb() {
                galleryThumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                const newSrc = thumb.getAttribute('data-img');
                if (newSrc && mainGalleryImg.src !== newSrc) {
                    mainGalleryImg.style.opacity = '0.35';
                    setTimeout(function () {
                        mainGalleryImg.src = newSrc;
                        mainGalleryImg.style.opacity = '1';
                    }, 120);
                }
            }

            thumb.addEventListener('click', activateThumb);
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
        // Both input and change events for mobile slider touch compatibility
        calcPriceSlider.addEventListener('input', calculateInstallments);
        calcPriceSlider.addEventListener('change', calculateInstallments);

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
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
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

    /* ================= ADVANCED SEARCH BAR (index.html) ================= */
    const homeSearchBtn = document.querySelector('.kayan-search-btn');
    if (homeSearchBtn) {
        homeSearchBtn.removeAttribute('onclick');
        homeSearchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'projects.html';
        });
    }

});
