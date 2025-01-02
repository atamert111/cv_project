document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('.collapsible h3');

    headings.forEach(heading => {
        heading.addEventListener('click', () => {
            const content = heading.nextElementSibling;

            if (content.style.display === 'none' || !content.style.display) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });

        // Varsayılan olarak içerikleri gizle
        const content = heading.nextElementSibling;
        if (content) content.style.display = 'none';
    });
});
