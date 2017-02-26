/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL should be defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name should be defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite: "The menu" */

    /* This test ensures the menu element is
     * hidden by default. 
     */


    describe('The menu', function() {
        it('menu should be hidden by default', function() {
            expect(document.getElementsByTagName('body')[0].className).toBe('menu-hidden');
        });

        /* This test is to check whether the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('menu should change visibility on click', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(document.getElementsByTagName('body')[0].className).not.toBe('menu-hidden');
            menuIcon.click();
            expect(document.getElementsByTagName('body')[0].className).toBe('menu-hidden');
        });
    });

    /* Test suite: "Initial Entries" */

    /* This test ensures that when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('there is atleast one .entry elemeny within the .feed container', function(done) {
            var $feed = $('.feed');
            expect($feed.find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite: "New Feed Selection"

    /* The test ensures that when a new feed is loaded
     * by the loadFeed function, the content actually changes.
    */
    describe('New Feed Selection', function() {
        var oldFeed = '',
            currentFeed = '';
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed .entry').html();
                done();
            });
        });
        it('content should change when a new feed is loaded', function(done) {
            loadFeed(1, function() {
                currentFeed = $('.feed .entry').html();
                expect(currentFeed).not.toEqual(oldFeed);
                done();
            });
        });
    });
}());
