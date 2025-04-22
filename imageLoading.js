document.addEventListener('DOMContentLoaded', () => {
    const badges = Array.from(document.querySelectorAll('img.image-badge'));
    const titles = Array.from(document.querySelectorAll('img.img-title'));
    const details = Array.from(document.querySelectorAll('img.img-detail'));
    const images = titles.concat(details);

  // 원래 src 저장 후 제거
    const imagesUrls = images.map(img => img.getAttribute('src'));
    const badgeUrls = badges.map(img => img.getAttribute('src'));
    badges.concat(images).forEach(img => {
        img.src = 'svgs/fade-stagger-squares.svg';
        img.classList.add('loading-icon');
    });

    // 일반 이미지 로딩
    (async () => {
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const url = imagesUrls[i];
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Fetch failed: ${url}`);
                const blob = await res.blob();
                img.src = URL.createObjectURL(blob);
                img.classList.remove('loading-icon');
                // console.log(img.src)
            } catch (e) {
                console.error(e);
                img.src = 'svgs/alert-error-svgrepo-com.svg';
            }
        }

    })();

    //배지 이미지 불러오기
    (async () => {
        const tasks = badges.map(async (img, idx) => {
            const url = badgeUrls[idx];
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Fetch failed: ${url}`);
                const blob = await res.blob();
                const objectURL = URL.createObjectURL(blob);

                img.src = objectURL;
                await new Promise(resolve => {
                    img.addEventListener('load', () => {
                        // console.log(img.src)
                        URL.revokeObjectURL(objectURL);
                        img.classList.add('slide-in');
                        resolve();
                    }, { once: true });
                    img.addEventListener('error', () => {
                        URL.revokeObjectURL(objectURL);
                        resolve();
                    }, { once: true });
                });

            } catch (e) {
                console.error(e);
                img.src = 'svgs/alert-error-svgrepo-com.svg';
            }
        });

        await Promise.all(tasks);

        disappearLoading();
    })();

});


function disappearLoading() {
    console.log('Badge Loading Complete');
    document.querySelectorAll('img.image-badge.loading-icon')
        .forEach(icon => {
            icon.classList.remove('loading-icon');
        });
}