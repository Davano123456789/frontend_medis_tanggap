document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
    });
    

    window.addEventListener('DOMContentLoaded', () => {
        const container1 = document.getElementById('cards-container-1');
        const container2 = document.getElementById('cards-container-2');
    
        // Menyembunyikan container kedua
        container2.style.display = 'none';
    
        // Fungsi untuk menangani scroll
        const handleScroll = () => {
            if (container1.scrollLeft + container1.clientWidth >= container1.scrollWidth) {
                // Jika sudah sampai ujung, tampilkan container 2 dan reset scroll ke awal
                container1.style.display = 'none';
                container2.style.display = 'flex';
                container2.scrollLeft = 0; // Mulai scroll dari awal container 2
    
                // Setelah 0.5 detik (untuk transisi) pindahkan scroll kembali ke container 1
                setTimeout(() => {
                    container2.style.display = 'none';
                    container1.style.display = 'flex';
                    container1.scrollLeft = 0; // Mulai scroll dari awal container 1
                }, 500); // Waktu delay sebelum kembali ke container 1
            }
        };
    
        // Menambahkan event listener untuk scroll
        container1.addEventListener('scroll', handleScroll);
    });
    