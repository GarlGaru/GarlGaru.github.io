
const darkToggle = document.getElementById('darkModeToggle');


darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelectorAll('.highlight-teal_background').forEach(highlight => {
        highlight.classList.toggle('dark');
    });
    document.querySelectorAll('.highlight-yellow_background').forEach(highlight => {
        highlight.classList.toggle('dark');
    });
    document.querySelectorAll('hr').forEach(highlight => {
        highlight.classList.toggle('dark');
    });

    if(document.body.classList.contains('dark')) {
        darkToggle.textContent = '☀️';
    } else {
        darkToggle.textContent = '🌙';
    }
});


