/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a url on each feed', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name on each feed', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        var body;

        beforeEach(function () {
            body = document.getElementsByTagName('body')[0];
        });

        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should hide the menu element by default', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should toggle the menu visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link');

            // Show menu
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // Hide menu
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should load feed entries', function () {
            var entries = document.querySelectorAll('.feed .entry');

            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var originalTimeout;
        var firstFeed;
        var secondFeed;

        function getEntryElements() {
            return document.querySelectorAll('.feed .entry');
        }

        beforeEach(function(done){        
            // The unit test is loading 100+ entries and can 
            // occasionally timeout so we are increasing the
            // default timeout interval to account for this
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

            loadFeed(0, function(){
                firstFeed = getEntryElements();

                loadFeed(3, function(){
                    secondFeed = getEntryElements();
                    done();
                });
            });
        });

        afterEach(function(){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should load new entries when a different feed is selected', function () {
            expect(firstFeed).toBeDefined();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());