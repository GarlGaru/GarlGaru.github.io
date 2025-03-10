
const darkToggle = document.getElementById('darkModeToggle');

const moonIconPath = 'svgs/moon.svg';
const sunIconPath = 'svgs/sun.svg';

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.highlight-teal_background').forEach(highlight => {
        highlight.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.highlight-yellow_background').forEach(highlight => {
        highlight.classList.toggle('dark-mode');
    });
    document.querySelectorAll('hr').forEach(highlight => {
        highlight.classList.toggle('dark-mode');
    });

    if(document.body.classList.contains('dark-mode')) {
        darkToggle.src = sunIconPath;
    } else {
        darkToggle.src = moonIconPath;
    }
});


