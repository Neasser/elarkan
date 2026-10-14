/* =========================================================
   كيان العقارية - KAYAN REAL ESTATE
   Master Scripts - High-Performance Mobile & Desktop JS
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ================= MOBILE BURGER MENU (TOUCH & DESKTOP) ================= */
    const nav = document.getElementById('kayanNav');
    const toggleBtn = document.getElementById('kayanMobileToggle') || document.querySelector('.kayan-mobile-toggle');
    let lastToggleTime = 0;

    function toggleMobileMenu(e) {
        if (e) {
            if (e.cancelable) e.preventDefault();
            e.stopPropagation();
        }
        const now = Date.now();
        if (now - lastToggleTime < 350) {
            return;
        }
        lastToggleTime = now;

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

    window.kayanMenu = toggleMobileMenu;

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', toggleMobileMenu);

        // Close on clicking/tapping outside
        document.addEventListener('click', function (e) {
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
        });

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
            }
        );
        });
    }

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
    window.showToast = showToast;

    window.handleContactSubmit = function(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
        }
        setTimeout(function() {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            form.reset();
            showToast('شكراً لتواصلكم مع دار الأركان للتطوير العقاري! تم استلام طلبكم بنجاح وسيتواصل معكم مستشار المبيعات فوراً.');
        }, 700);
    };

    window.handleCareersSubmit = function(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
        }
        setTimeout(function() {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            form.reset();
            showToast('تم استلام طلب التوظيف والسيرة الذاتية بنجاح! سيتواصل معكم قسم الموارد البشرية بدار الأركان.');
        }, 700);
    };

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
                showToast('شكراً لتواصلكم مع دار الأركان للتطوير العقاري! تم استلام طلبكم وسيتواصل معكم فريقنا في أقرب وقت.');
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


/* =========================================================
   ROUND 2 REVISIONS ADDITIONS (R2, R10, R11, R13, R17)
========================================================= */

/* Mobile Menu Enhanced Handler */
(function() {
    var mobileToggle = document.getElementById('kayanMobileToggle') || document.querySelector('.kayan-mobile-toggle');
    var mobileMenu = document.getElementById('kayanMobileMenu');
    var mobileClose = document.getElementById('kayanMobileClose');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('kayan-menu-open');
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.remove('open');
            document.body.classList.remove('kayan-menu-open');
        });
    }

    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(e.target) && (!mobileToggle || !mobileToggle.contains(e.target))) {
                mobileMenu.classList.remove('open');
                document.body.classList.remove('kayan-menu-open');
            }
        }
    });
})();

/* R2: Hero Slider Autoplay, RTL, Controls & Pause */
function initHeroSlider() {
    var slider = document.getElementById('homeHeroSlider') || document.querySelector('.kayan-hero-slider');
    if (!slider) return;
    var slides = slider.querySelectorAll('.kayan-hero-slide');
    var dots = slider.querySelectorAll('.kayan-slider-dot');
    var prevBtn = slider.querySelector('.kayan-slider-prev') || document.getElementById('heroSliderPrev');
    var nextBtn = slider.querySelector('.kayan-slider-next') || document.getElementById('heroSliderNext');

    if (slides.length <= 1) return;

    var current = 0;
    var timer = null;
    var isPaused = false;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;

        slides.forEach(function(s, idx) {
            s.classList.toggle('active', idx === current);
        });
        dots.forEach(function(d, idx) {
            d.classList.toggle('active', idx === current);
        });
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    function startAuto() {
        stopAuto();
        timer = setInterval(function() {
            if (!isPaused) {
                nextSlide();
            }
        }, 5000);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            startAuto();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            startAuto();
        });
    }

    dots.forEach(function(dot, idx) {
        dot.addEventListener('click', function() {
            goToSlide(idx);
            startAuto();
        });
    });

    slider.addEventListener('mouseenter', function() { isPaused = true; });
    slider.addEventListener('mouseleave', function() { isPaused = false; });
    slider.addEventListener('touchstart', function() { isPaused = true; }, {passive: true});
    slider.addEventListener('touchend', function() { isPaused = false; }, {passive: true});

    startAuto();
}
window.initHeroSlider = initHeroSlider;

/* R10: Sidebar Booking Form Submission */
window.handleBookingSubmit = function(e, projectName) {
    if (e) e.preventDefault();
    var form = e ? e.target : document.getElementById('sidebarBookingForm');
    if (!form) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري إرسال طلب الحجز...';
    }

    setTimeout(function() {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
        form.reset();
        var msg = 'تم استلام طلب حجزك لمشروع ' + (projectName || 'دار الأركان') + ' بنجاح! سيتواصل معك استشاري المبيعات لتحديد موعد المعاينة على الطبيعة.';
        if (typeof window.showToast === 'function') {
            window.showToast(msg);
        } else {
            alert(msg);
        }
    }, 700);
};

/* Video Modal */
window.playVideoModal = function(src, title) {
    var modal = document.getElementById('kayanVideoModal');
    var player = document.getElementById('kayanModalVideoPlayer');
    var titleEl = document.getElementById('kayanModalVideoTitle');
    if (!modal || !player) return;

    player.src = src;
    if (titleEl) titleEl.textContent = title || 'فيديو المشروعات';
    modal.classList.add('active');
    player.play().catch(function(){});
};

window.closeVideoModal = function(e) {
    var modal = document.getElementById('kayanVideoModal');
    var player = document.getElementById('kayanModalVideoPlayer');
    if (!modal) return;
    if (e && e.target !== modal && !e.target.classList.contains('kayan-video-modal-close')) return;

    if (player) {
        player.pause();
        player.src = '';
    }
    modal.classList.remove('active');
};

/* Image Lightbox */
window.openImageLightbox = function(src) {
    var modal = document.getElementById('kayanImageModal');
    var imgTag = document.getElementById('kayanModalImageTag');
    if (!modal) {
        // Create modal dynamically if not already in DOM
        modal = document.createElement('div');
        modal.id = 'kayanImageModal';
        modal.className = 'kayan-video-modal';
        modal.onclick = function(e) { window.closeImageLightbox(e); };
        modal.innerHTML = '<div class="kayan-video-modal-content" style="max-width:850px; background:transparent; border:none; text-align:center;" onclick="event.stopPropagation()"><button class="kayan-video-modal-close" onclick="window.closeImageLightbox()">&times;</button><img id="kayanModalImageTag" src="" alt="معاينة" style="max-width:100%; max-height:85vh; border-radius:8px; border:1px solid #333; box-shadow:0 10px 40px rgba(0,0,0,0.8);"></div>';
        document.body.appendChild(modal);
        imgTag = document.getElementById('kayanModalImageTag');
    }
    if (imgTag) imgTag.src = src;
    modal.classList.add('active');
};

window.closeImageLightbox = function(e) {
    var modal = document.getElementById('kayanImageModal');
    if (!modal) return;
    if (e && e.target !== modal && !e.target.classList.contains('kayan-video-modal-close')) return;
    modal.classList.remove('active');
};

/* R11: Project Detail Page Construction Progress Tab */
function initProjectConstructionTab() {
    var container = document.getElementById('projectConstructionStagesContainer');
    if (!container) return;

    var projectId = container.getAttribute('data-project-id');
    if (!projectId) {
        var pageName = window.location.pathname.split('/').pop();
        var match = pageName.match(/project-([a-z0-9]+)\.html/);
        if (match) projectId = match[1];
    }

    if (!projectId || !window.KayanConstructions) return;

    var project = window.KayanConstructions.getById(projectId);
    var parentSection = document.getElementById('projectConstructionProgressSection');

    if (!project || !project.stages || project.stages.length === 0) {
        if (parentSection) parentSection.style.display = 'none';
        return;
    }

    var html = '<div class="kayan-stage-timeline">';
    project.stages.forEach(function(stage) {
        html += '<div class="kayan-stage-card">';
        html += '  <div class="kayan-stage-header">';
        html += '    <h4><i class="fa-solid fa-circle-check" style="color:var(--color-primary); margin-left:8px;"></i> ' + stage.title + '</h4>';
        html += '    <span class="kayan-stage-date">' + stage.date + '</span>';
        html += '  </div>';
        html += '  <p class="kayan-stage-desc">' + stage.desc + '</p>';

        if (stage.images && stage.images.length > 0) {
            html += '  <div class="kayan-stage-gallery">';
            stage.images.forEach(function(imgSrc) {
                html += '    <div class="kayan-stage-thumb" onclick="window.openImageLightbox(&quot;' + imgSrc + '&quot;)">';
                html += '      <img src="' + imgSrc + '" alt="' + stage.title + '" loading="lazy">';
                html += '    </div>';
            });
            html += '  </div>';
        }

        if (stage.videos && stage.videos.length > 0) {
            html += '  <div style="margin-top:16px; display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:14px;">';
            stage.videos.forEach(function(vid) {
                html += '    <div class="kayan-video-cover-wrap" style="height:160px; border-radius:10px;" onclick="window.playVideoModal(&quot;' + vid.src + '&quot;, &quot;' + vid.title + '&quot;)">';
                html += '      <img src="' + vid.poster + '" alt="' + vid.title + '">';
                html += '      <div class="kayan-video-play-overlay" style="width:44px; height:44px; font-size:16px;"><i class="fa-solid fa-play"></i></div>';
                html += '    </div>';
            });
            html += '  </div>';
        }

        html += '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
}
window.initProjectConstructionTab = initProjectConstructionTab;

/* R17: Constructions Page (constructions.html) Tabs and Stages */
function initConstructionsPage() {
    var tabsNav = document.getElementById('constructionTabsNav');
    var area = document.getElementById('activeProjectConstructionArea');
    if (!tabsNav || !area || !window.KayanConstructions) return;

    var projects = window.KayanConstructions.projects;
    if (!projects || projects.length === 0) return;

    // Render Tabs
    var tabsHtml = '';
    projects.forEach(function(p, idx) {
        var activeClass = idx === 0 ? 'active' : '';
        tabsHtml += '<button type="button" class="kayan-tab-btn ' + activeClass + '" data-pid="' + p.id + '">';
        tabsHtml += p.shortName || p.name;
        tabsHtml += '</button>';
    });
    tabsNav.innerHTML = tabsHtml;

    function renderProjectStages(project) {
        if (!project) return;
        var pUrl = project.projectUrl ? '<a href="' + project.projectUrl + '" class="kayan-btn kayan-btn-outline" style="padding:7px 16px; font-size:12px;">صفحة تفاصيل المشروع <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i></a>' : '';

        var html = '<div class="kayan-single-card" style="padding:30px; margin-bottom:30px; border:1px solid rgba(243,232,217,0.3);">';
        html += '  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom:20px;">';
        html += '    <div>';
        html += '      <span style="background:rgba(243,232,217,0.1); color:var(--color-primary); font-size:12px; font-weight:700; padding:4px 12px; border-radius:15px;">' + project.categoryName + '</span>';
        html += '      <h3 style="color:#fff; font-size:24px; margin:8px 0 4px; font-family:var(--kayan-font-title);">' + project.name + '</h3>';
        html += '      <span style="color:#aaa; font-size:13px;"><i class="fa-solid fa-location-dot" style="color:var(--color-primary); margin-left:6px;"></i> ' + project.location + '</span>';
        html += '    </div>';
        html += '    <div>' + pUrl + '</div>';
        html += '  </div>';

        html += '  <div style="background:#161616; border-radius:10px; padding:16px 20px; margin-bottom:25px; border:1px solid #282828;">';
        html += '    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">';
        html += '      <span style="color:#ccc;">المرحلة الحالية: <strong style="color:#fff;">' + project.currentStageName + '</strong></span>';
        html += '      <span style="color:var(--color-primary); font-weight:700;">نسبة التنفيذ الإجمالية: ' + project.overallPercent + '%</span>';
        html += '    </div>';
        html += '    <div style="background:#222; border-radius:8px; height:10px; overflow:hidden;">';
        html += '      <div style="background:linear-gradient(90deg, var(--kayan-gold-dark), var(--color-primary)); height:100%; width:' + project.overallPercent + '%;"></div>';
        html += '    </div>';
        html += '  </div>';

        html += '  <div class="kayan-stage-timeline">';
        project.stages.forEach(function(stage) {
            html += '<div class="kayan-stage-card">';
            html += '  <div class="kayan-stage-header">';
            html += '    <h4><i class="fa-solid fa-circle-check" style="color:var(--color-primary); margin-left:8px;"></i> ' + stage.title + '</h4>';
            html += '    <span class="kayan-stage-date">' + stage.date + '</span>';
            html += '  </div>';
            html += '  <p class="kayan-stage-desc">' + stage.desc + '</p>';

            if (stage.images && stage.images.length > 0) {
                html += '  <div class="kayan-stage-gallery">';
                stage.images.forEach(function(imgSrc) {
                    html += '    <div class="kayan-stage-thumb" onclick="window.openImageLightbox(&quot;' + imgSrc + '&quot;)">';
                    html += '      <img src="' + imgSrc + '" alt="' + stage.title + '" loading="lazy">';
                    html += '    </div>';
                });
                html += '  </div>';
            }

            if (stage.videos && stage.videos.length > 0) {
                html += '  <div style="margin-top:16px; display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:14px;">';
                stage.videos.forEach(function(vid) {
                    html += '    <div class="kayan-video-cover-wrap" style="height:160px; border-radius:10px;" onclick="window.playVideoModal(&quot;' + vid.src + '&quot;, &quot;' + vid.title + '&quot;)">';
                    html += '      <img src="' + vid.poster + '" alt="' + vid.title + '">';
                    html += '      <div class="kayan-video-play-overlay" style="width:44px; height:44px; font-size:16px;"><i class="fa-solid fa-play"></i></div>';
                    html += '    </div>';
                });
                html += '  </div>';
            }

            html += '</div>';
        });
        html += '  </div>';
        html += '</div>';

        area.innerHTML = html;
    }

    // Initial render
    renderProjectStages(projects[0]);

    // Tab buttons event listeners
    tabsNav.querySelectorAll('.kayan-tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabsNav.querySelectorAll('.kayan-tab-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var pid = btn.getAttribute('data-pid');
            var p = window.KayanConstructions.getById(pid);
            renderProjectStages(p);
        });
    });
}
window.initConstructionsPage = initConstructionsPage;

// Auto-run helpers on page load
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initProjectConstructionTab();
});
