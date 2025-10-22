document.addEventListener("DOMContentLoaded", () => {

    // --- 1. TỰ ĐỘNG ACTIVE MENU KHI CUỘN (Đã nâng cấp) ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("header nav a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Xóa active ở tất cả link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Thêm active cho link tương ứng
                // Dùng querySelector để tìm link có href = #id
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        // Kích hoạt khi section đi vào 1 "vùng" ở giữa màn hình
        // Giúp menu active chính xác hơn là chỉ dựa vào top
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // --- 2. NÚT LÊN ĐẦU TRANG (MOVE TO TOP) ---
    const moveTopBtn = document.getElementById("moveTopBtn");

    function toggleMoveTopBtn() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            moveTopBtn.style.display = "flex";
        } else {
            moveTopBtn.style.display = "none";
        }
    }

    moveTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // --- 3. SLIDER ẢNH TRANG CHỦ ---
    // (Code này cho trang index.html, nó có kiểm tra null
    // nên sẽ không gây lỗi ở trang này)
    const slides = document.querySelector(".slides");
    const slideImages = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".arrow.prev");
    const nextBtn = document.querySelector(".arrow.next");

    if (slides && slideImages.length > 0 && prevBtn && nextBtn) { 
        let slideIndex = 0;
        const slideCount = slideImages.length;
        
        slides.style.width = `${slideCount * 100}%`;
        
        slideImages.forEach(img => {
            img.style.width = `${100 / slideCount}%`;
        });
        
        function showSlide(index) {
            if (index >= slideCount) { slideIndex = 0; }
            if (index < 0) { slideIndex = slideCount - 1; }
            
            slides.style.transform = `translateX(-${slideIndex * (100 / slideCount)}%)`;
        }
    
        nextBtn.addEventListener("click", () => {
            slideIndex++;
            showSlide(slideIndex);
        });
    
        prevBtn.addEventListener("click", () => {
            slideIndex--;
            showSlide(slideIndex);
        });
        
        setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 4000);
    }


    // --- 4. HIỆU ỨNG GÕ CHỮ (TYPING EFFECT) ---
    // (Code này cũng cho trang index.html)
    const typingElement = document.querySelector(".typing-effect");
    if(typingElement) {
        const textArray = ["Full Stack Developer", "Data Analyst", "Fitness Enthusiast"]; 
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
    
        function type() {
            const currentText = textArray[textIndex];
            let displayText = "";
    
            if (isDeleting) {
                displayText = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
    
            typingElement.innerHTML = displayText;
            
            let typeSpeed = isDeleting ? 100 : 200;
    
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }
    
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- 5. HIỆU ỨNG KHI CUỘN (SCROLL ANIMATIONS) ---
    
    // A. (Code mới) Kích hoạt Animation cho [data-animate]
    // Code này sẽ tìm tất cả các thẻ có [data-animate]
    // và thêm class 'animated' khi nó lọt vào màn hình
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Kích hoạt khi 15% phần tử xuất hiện
    });

    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });
    
    // B. Kích hoạt Progress Bar (giữ lại từ code cũ của bạn, code này đã tốt)
    const skillSection = document.getElementById('skills');
    if (skillSection) {
         const progressObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const progressBars = document.querySelectorAll(".progress");
                progressBars.forEach(bar => {
                    // Đảm bảo có thuộc tính data-width
                    if(bar.hasAttribute("data-width")) {
                        bar.style.width = bar.getAttribute("data-width");
                    }
                });
                progressObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        progressObserver.observe(skillSection);
    }

    // --- 6. POPUP GỬI FORM LIÊN HỆ ---
    const contactForm = document.getElementById("contactForm");
    const popup = document.getElementById("thankYouPopup");

    if (contactForm && popup) { // Thêm kiểm tra popup
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            popup.classList.add("active");
            
            setTimeout(() => {
                popup.classList.remove("active");
            }, 3000);
            
            contactForm.reset();
        });
        
        popup.addEventListener("click", (e) => {
             if (e.target === popup) {
                 popup.classList.remove("active");
             }
        });
    }
    
    // --- 7. HIỆU ỨNG HEADER KHI CUỘN ---
    const header = document.querySelector("header");

    function toggleHeaderBg() {
        // Chỉ thêm/xóa class nếu header tồn tại
        if (header) { 
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    }

    // --- 8. GỌI CÁC HÀM CẦN CHẠY KHI TẢI TRANG ---
    toggleMoveTopBtn();
    toggleHeaderBg(); 
    
    // Listener khi cuộn (đã xóa updateActiveNav() vì Observer tự xử lý)
    window.addEventListener("scroll", () => {
        toggleMoveTopBtn();
        toggleHeaderBg();
    });

});