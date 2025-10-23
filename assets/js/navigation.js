// Helper function to determine base path
function getBasePath() {
    const currentPath = window.location.pathname;
    
    // Find the position of 'WNBAAnalytics.com' in the path
    const baseIndex = currentPath.indexOf('WNBAAnalytics.com');
    let relativePath = currentPath;
    
    if (baseIndex !== -1) {
        // Extract path relative to WNBAAnalytics.com
        relativePath = currentPath.substring(baseIndex + 'WNBAAnalytics.com'.length);
    }
    
    const pathSegments = relativePath.split('/').filter(segment => segment !== '');
    const depth = pathSegments.length;
    
    // Debug logging
    console.log('Current path:', currentPath);
    console.log('Relative path:', relativePath);
    console.log('Path segments:', pathSegments);
    console.log('Depth:', depth);
    
    // Check if we're in an article subdirectory
    const articlesIndex = pathSegments.indexOf('articles');
    
    if (articlesIndex === -1) {
        // Not in articles directory - root level
        console.log('Detected: Root level');
        return '';
    } else if (articlesIndex === 0 && depth === 1) {
        // articles.html
        console.log('Detected: Articles page');
        return '';
    } else if (articlesIndex === 0 && depth === 2) {
        // articles/[folder]/file.html
        console.log('Detected: Articles subdirectory (1 level deep)');
        return '../';
    } else if (articlesIndex === 0 && depth === 3) {
        // articles/[folder]/[subfolder]/file.html
        console.log('Detected: Articles subdirectory (2 levels deep)');
        return '../../';
    } else {
        console.log('Using fallback');
        return '';
    }
}

// Sidebar component
function loadSidebar() {
    const basePath = getBasePath();
    
    // Debug logging
    console.log('Base path:', basePath);
    console.log('Generated links:');
    console.log('- Homepage:', basePath + 'index.html');
    console.log('- Articles:', basePath + 'articles.html');
    console.log('- About:', basePath + 'about.html');
    
    // Determine if this is an article page for featured content
    const currentPath = window.location.pathname;
    const isArticlePage = currentPath.includes('/articles/') && !currentPath.endsWith('articles.html');
    
    const sidebarHTML = `
        <!-- Search -->
        <section id="search" class="alt">
            <form method="post" action="#">
                <input type="text" name="query" id="query" placeholder="Search" />
            </form>
        </section>

        <!-- Menu -->
        <nav id="menu">
            <header class="major">
                <h2>Menu</h2>
            </header>
            <ul>
                <li><a href="${basePath}index.html">Homepage</a></li>
                <li><a href="${basePath}articles.html">Articles</a></li>
                <li><a href="${basePath}about.html">About</a></li>
            </ul>
        </nav>

        <!-- Section -->
        <section>
            <header class="major">
                <h2>Featured Analysis</h2>
            </header>
            <div class="mini-posts">
                <article>
                    <a href="${basePath}articles/how-do-wnba-players-age/how-do-wnba-players-age-part-i.html" class="image"><img src="${basePath}articles/how-do-wnba-players-age/images/ws-cumdiff-by-age-graph.png" alt="WNBA Player Aging Analysis" /></a>
                    <h3><a href="${basePath}articles/how-do-wnba-players-age/how-do-wnba-players-age-part-i.html">How Do WNBA Players Age? (Part I)</a></h3>
                </article>
            </div>
            <ul class="actions">
                <li><a href="${basePath}articles.html" class="button">View All Articles</a></li>
            </ul>
        </section>

        <!-- Section -->
        <section>
            <header class="major">
                <h2>About WNBA Analytics</h2>
            </header>
            <p>Dedicated to advancing the understanding of WNBA player performance through innovative statistical analysis. <a href="${basePath}about.html">Learn more</a></p>
            <ul class="contact">
                <li class="icon solid fa-envelope"><a href="#">wnbaanalytics@gmail.com</a></li>
                <li class="icon brands fa-instagram"><a href="http://instagram.com/wnbaanalytics">@wnbaanalytics</a></li>
                <li class="icon brands fa-twitter"><a href="https://x.com/wnbaanalytics">@wnbaanalytics</a></li>
            </ul>
        </section>

        <!-- Footer -->
        <footer id="footer">
            <p class="copyright">&copy; WNBA Analytics. All rights reserved. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>
    `;
    
    // Find the sidebar inner container and replace its content
    const sidebarInner = document.querySelector('#sidebar .inner');
    console.log('Sidebar container found:', !!sidebarInner);
    console.log('Base path being used:', basePath);
    
    if (sidebarInner) {
        sidebarInner.innerHTML = sidebarHTML;
        console.log('Sidebar content loaded successfully');
    } else {
        console.error('Sidebar container not found! Check if #sidebar .inner exists in the HTML');
    }
}

// Header component
function loadHeader() {
    const basePath = getBasePath();
    
    // Debug logging
    console.log('Loading header with base path:', basePath);
    
    const headerHTML = `
        <a href="${basePath}index.html" class="logo"><strong>WNBAAnalytics.com</strong></a>
        <ul class="icons">
            <li><a href="mailto:wnbaanalytics@gmail.com" class="icon fa-envelope" title="wnbaanalytics@gmail.com"><span class="label">Email</span></a></li>
            <li><a href="https://x.com/wnbaanalytics" class="icon brands fa-twitter" title="@wnbaanalytics"><span class="label">Twitter</span></a></li>
            <li><a href="http://instagram.com/wnbaanalytics" class="icon brands fa-instagram" title="@wnbaanalytics"><span class="label">Instagram</span></a></li>
        </ul>
    `;
    
    // Find the header and replace its content
    const header = document.querySelector('#header');
    console.log('Header found:', !!header);
    console.log('Base path being used for header:', basePath);
    
    if (header) {
        header.innerHTML = headerHTML;
        console.log('Header content loaded successfully');
    } else {
        console.error('Header not found! Check if #header exists in the HTML');
    }
}

// Load both sidebar and header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadSidebar();
    loadHeader();
});
