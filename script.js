
    //تبديل الصور
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    // تغيير شكل الناف عند الاسكرول
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // فتح / قفل المينيو
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // قفل المينيو لما تضغط على لينك
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    const hero = document.getElementById("hero");

    let canToggle = true;

    document.addEventListener("mousemove", () => {
      if (!canToggle) return;

      hero.classList.toggle("active");

      canToggle = false;

      setTimeout(() => {
        canToggle = true;
      }, 400); //تغيير صورة
    });


    function openModal(src) {
      document.getElementById("imageModal").style.display = "block";
      document.getElementById("imgFull").src = src;
    }


    document.getElementById('show-more-certs').addEventListener('click', function () {
      const hiddenCerts = document.querySelectorAll('.hidden-cert');
      const isExpanding = this.innerText.trim() === "View More Certificates";

      if (isExpanding) {
        gsap.set(".hidden-cert", { display: "flex" });

        gsap.to(".hidden-cert", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          // السطر اللي جاي ده هو الحل السحري
          onComplete: function () {
            // بنمسح الـ transform اللي GSAP عملته عشان الـ CSS Hover يشتغل بحرية
            gsap.set(".hidden-cert", { clearProps: "transform" });
          }
        });

        this.innerText = "Show Less";

      } else {
        // إخفاء الشهادات
        gsap.to(".hidden-cert", {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.05,
          onComplete: () => {
            gsap.set(".hidden-cert", { display: "none" });
          }
        });

        this.innerText = "View More Certificates";

        // العودة بالسكول لبداية قسم الشهادات
        document.getElementById('certificates').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 1. السطر ده هو "مفتاح التشغيل" الأساسي (أهم إضافة)
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".stat-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      // 2. تغيير بسيط في الـ Ease بيخلي الحركة "لذيذة" أكتر (مطاطية خفيفة)
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 85%",
        // 3. إضافة التفعيل العكسي (عشان لو طلع ونزل تاني الأنميشن يشتغل أو يثبت)
        toggleActions: "play none none none",
      },
      onStart: () => {
        animateNumbers();
      }
    });

    function animateNumbers() {
      gsap.utils.toArray('.counter').forEach(function (el) {
        const target = parseInt(el.getAttribute('data-target'));
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.inOut"
        });
      });
    }
    gsap.registerPlugin(ScrollTrigger);

    function initAnimations() {
      // ظهور الكارت الرئيسي
      gsap.to(".main-card-s2", {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".main-card-s2", start: "top 85%" }
      });

      // ظهور البانر
      gsap.to(".offer-banner-s2", {
        opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".main-card-s2", start: "top 80%" }
      });

      // ظهور الكروت تتابعياً
      gsap.to(".consult-card-s2", {
        opacity: 1, scale: 1, duration: 0.8, stagger: 0.3, ease: "power4.out",
        scrollTrigger: { trigger: ".consulting-grid-s2", start: "top 80%" }
      });

      // عداد الأرقام
      gsap.utils.toArray('.offer-counter-s2').forEach(el => {
        let target = parseInt(el.getAttribute('data-target'));
        gsap.to(el, {
          innerText: target, duration: 2, snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });

      // أشرطة التحميل
      gsap.to("#bar1-s2", { width: "30%", duration: 2, scrollTrigger: { trigger: "#bar1-s2", start: "top 90%" } });
      gsap.to("#bar2-s2", { width: "95%", duration: 2, scrollTrigger: { trigger: "#bar2-s2", start: "top 90%" } });
    }

    function startTimer() {
      const referenceDate = new Date("2026-01-01T00:00:00").getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

      function update() {
        const now = new Date().getTime();
        const timePassed = now - referenceDate;
        const remaining = threeDaysInMs - (timePassed % threeDaysInMs);

        const h = Math.floor((remaining / (1000 * 60 * 60)) % 72); // ندمج الأيام في الساعات
        const m = Math.floor((remaining / (1000 * 60)) % 60);
        const s = Math.floor((remaining / 1000) % 60);

        document.getElementById("hours-s2").innerText = h.toString().padStart(2, '0');
        document.getElementById("minutes-s2").innerText = m.toString().padStart(2, '0');
        document.getElementById("seconds-s2").innerText = s.toString().padStart(2, '0');
      }
      setInterval(update, 1000);
      update();
    }

    window.onload = () => {
      initAnimations();
      startTimer();
    };

    // الرواية
    // أنميشن الرؤية والرسالة - المطور
    function initVisionAnimation() {
      gsap.to(".vision-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".vision-mission",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }

    // استدعاء الأنميشن داخل window.onload
    window.addEventListener('load', () => {
      initAnimations(); // الأنميشنات القديمة
      startTimer();     // العداد
      initVisionAnimation(); // أنميشن الرؤية الجديد
    });


    {
      // الكود الجديد بالكامل جوه القوسين دول
      const scrollBtn = document.getElementById("scrollTopBtn");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.add("show");
        } else {
          scrollBtn.classList.remove("show");
        }
      });

      scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // كود التحكم في سلايدر النتائج للموبايل
    const resultsTrack = document.querySelector('.infinite-results-track');

    if (resultsTrack) {
      // عند لمس الشاشة (Mobile Touch Start)
      resultsTrack.addEventListener('touchstart', () => {
        resultsTrack.style.animationPlayState = 'paused';
      }, { passive: true });

      // عند رفع الإصبع عن الشاشة (Mobile Touch End)
      resultsTrack.addEventListener('touchend', () => {
        resultsTrack.style.animationPlayState = 'running';
      }, { passive: true });

      // لضمان استمرارية العمل إذا خرج الإصبع خارج الحاوية
      resultsTrack.addEventListener('touchcancel', () => {
        resultsTrack.style.animationPlayState = 'running';
      }, { passive: true });
    }
 

    document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".hero-card");
  const container = document.querySelector(".hero-container");

  if (!card || !container) return;

  // دالة حساب حركة الـ 3D وتطبيقها عبر GSAP لضمان سلاسة الأنميشن
  function handleTilt(e) {
    // تحديد إحداثيات الحركة سواء كانت ماوس أو لمس موبايل
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left; 
    const y = clientY - rect.top; 

    // حساب زوايا الدوران بناءً على مركز الحاوية
    const rotateX = -((y - rect.height / 2) / rect.height) * 30; // زاوية الميل الرأسي (أقصى حد 30 درجة)
    const rotateY = ((x - rect.width / 2) / rect.width) * 30;   // زاوية الميل الأفقي

    // تطبيق الأنميشن فوراً بسلاسة
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.2,
      ease: "power2.out"
    });
  }

  // دالة إعادة الكارت لوضعه الطبيعي المستوي عند ترك الشاشة
  function resetTilt() {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  }

  // --- أحداث الشاشات الكبيرة (الماوس) ---
  container.addEventListener("mousemove", handleTilt);
  container.addEventListener("mouseleave", resetTilt);

  // --- أحداث شاشات الموبايل (اللمس والضغط) ---
  container.addEventListener("touchmove", handleTilt, { passive: true });
  container.addEventListener("touchend", resetTilt);
  container.addEventListener("touchstart", (e) => {
    // تأثير نبضي خفيف عند أول لمسة للموبايل قبل التحريك
    handleTilt(e);
  }, { passive: true });
});
