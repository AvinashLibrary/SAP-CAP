sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'firoielementsapp/test/integration/FirstJourney',
		'firoielementsapp/test/integration/pages/AuthorsList',
		'firoielementsapp/test/integration/pages/AuthorsObjectPage',
		'firoielementsapp/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, AuthorsList, AuthorsObjectPage, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('firoielementsapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAuthorsList: AuthorsList,
					onTheAuthorsObjectPage: AuthorsObjectPage,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);