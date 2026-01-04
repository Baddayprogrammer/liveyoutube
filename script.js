document.addEventListener('DOMContentLoaded', function() { 
    const ytLink = document.getElementById('youtube-link');
    const webUrl = "https://www.youtube.com/@RuntimeRanger";
    const appUrl = "vnd.youtube://www.youtube.com/@RuntimeRanger";
    ytLink.addEventListener('click', function(e) {
        const ua = navigator.userAgent;
        const isStandardMobile = /Android|iPhone|iPad/i.test(ua);
        const isIpadDesktop = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
        const isMobile = isStandardMobile || isIpadDesktop;
        if (isMobile) {
            e.preventDefault(); 
            window.location.href = appUrl;
            setTimeout(function() {
                window.location.href = webUrl;
            }, 500);
        }
    });
});