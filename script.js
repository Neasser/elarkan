/* =========================================================
   كيان العقارية - KAYAN REAL ESTATE
   Scripts
========================================================= */

/* ================= MOBILE MENU ================= */

function kayanMenu(){

    const nav = document.getElementById('kayanNav');

    nav.classList.toggle('open');

}


/* ================= SCROLL TOP ================= */

const kayanScrollTop =
document.getElementById('kayanScrollTop');

window.addEventListener('scroll',function(){

    if(window.scrollY > 500){

        kayanScrollTop.classList.add('show');

    }else{

        kayanScrollTop.classList.remove('show');

    }

});


kayanScrollTop.addEventListener('click',function(e){

    e.preventDefault();

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

});


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('.kayan-home a[href^="#"]')
.forEach(function(link){

    link.addEventListener('click',function(e){

        const target =
        document.querySelector(this.getAttribute('href'));

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });

        }

    });

});
