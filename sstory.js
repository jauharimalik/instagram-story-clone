class SlideStories {
    constructor(id) {
        this.sstorys = document.querySelectorAll(`[class="${id}"]`);
        this.sstorys.forEach((el) => {
            this.pan = el.querySelector(".sstory").getAttribute("data-sstory");
            el.querySelectorAll(".sstory").forEach((newel) => { this.addcontrol(newel); });
            el.classList.add(this.pan);
            this.sstory = document.querySelector("." + this.pan);
            this.active = 0;
            this.init();
            this.addNavigation();
        });
    };

    klikstory() {
        let sb = document.querySelectorAll(".sbitem");
        sb.forEach((si) => {
            let phar = si.querySelector(".sstory").getAttribute("data-sstory");
            si.setAttribute("data-indicator", phar);
            if (si.getAttribute("data-on") != null) {
                let datake = si.querySelector(".sstory-thumb>*").getAttribute("data-ke");
                datake = parseInt(datake);
                si.onclick = () => {
                    if (parseInt(si.getAttribute("data-on")) != 1) {
                        this.activeSlide(datake);
                    }
                };
                if (parseInt(si.getAttribute("data-on")) != 1) { si.classList.add("bk"); }
            } else {
                si.classList.add("bk");
            }
        });
    };

    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => {
            item.classList.remove('active');
            item.parentElement.parentElement.parentElement.removeAttribute("data-on");
        });

        this.items[index].classList.add('active');
        this.sstory.querySelectorAll('.sstory-thumb > *').forEach((item) => {
            item.classList.remove('active');
        });

        this.items[index].parentElement.parentElement.parentElement.classList.remove("bk");
        document.querySelector("[data-ke='" + index + "']").classList.add("active");
        //this.thumbItems[index].setAttribute("class", 'active');
        this.items[index].parentElement.parentElement.parentElement.setAttribute("data-on", 1);
        this.parpan = this.items[index].parentElement.parentElement.getAttribute("data-sstory");
        this.autoSlide();
        this.pause();
        this.klikstory();
    };

    pause() {
        let sbi = document.querySelectorAll(".sbitem");
        sbi.forEach((sbit) => {
            if (sbit.getAttribute("data-on") != null) {
                if (sbit.getAttribute("data-on") == 1) {
                    sbit.onmouseenter = () => {
                        console.log("stop");
                        clearTimeout(this.timeout);
                    };
                }
            }

            sbit.onmouseleave = () => {
                this.autoSlide();
                console.log("resume");
            };
        });
    };

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length - 1);
        }
    };

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1);
        } else {
            this.activeSlide(0);
        }
    };

    addNavigation() {
        document.onkeydown = (event) => {
            switch (event.keyCode) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
            }
        };
        this.sstory.querySelectorAll('.sstory-next').forEach((next) => {
            next.onclick = () => { this.next(); };
        });
        this.sstory.querySelectorAll('.sstory-prev').forEach((prev) => {
            prev.onclick = () => { this.prev(); };
        });
    };

    addThumbItems(navi) {
        let x = 0;
        this.items.forEach((item) => {
            let tagmet = item.parentElement.parentElement.getAttribute("data-sstory");
            item.setAttribute("data-sub", tagmet);
            if (tagmet == navi.getAttribute("data-on")) {
                navi.innerHTML += "<span data-sub='" + tagmet + "' data-ke='" + x + "'></span>";
            }
            x++;
        });
        this.thumbItems = Array.from(this.thumb.children);
    };

    autoSlide() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, 5000);
    };

    addcontrol(element) {
        element.innerHTML += "<nav class='sstory-nav'><div class='sstory-thumb'></div><button class='sstory-prev'></button><button class='sstory-next'></button></nav>";
    };

    init() {
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.items = this.sstory.querySelectorAll('.' + this.pan + ' .sstory-items > *');
        this.thumbs = this.sstory.querySelectorAll('.' + this.pan + ' .sstory-thumb');
        this.thumbs.forEach((navi) => {
            let phar = navi.parentElement.parentElement.getAttribute("data-sstory");
            navi.classList.add(phar);
            navi.setAttribute("data-on", phar);
            this.thumb = navi;
            this.addThumbItems(navi);
        });

        this.activeSlide(0);
    };
}

new SlideStories("story");