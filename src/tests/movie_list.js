describe('Movie Search Tests', function () {

  describe('when conducting a search', function() {

    beforeEach(function(client, done) {
      client
        .url('http://localhost:8080')
        .waitForElementVisible('body', 1000)
        .setValue('input.search-input', 'star wars')
        .waitForElementVisible('button.search-btn', 1000)
        .click('button.search-btn')
        .waitForElementVisible('table tr:first-child td.movie-Year', 500)

      done();
    });

    it ('shows results', function(client) {
      client.expect.element('.table').to.contain.text('A New Hope');
      client.end();
    });

    it ('retains search string in search input field', function(client) {
      client.expect.element('input.search-input').to.contain.value('star wars');
      client.end();
    });

    it ('shows results in ascending order by year by default', function(client) {
      client.expect.element('table th.header-Year i.fa-sort-asc').to.be.present;
      client.expect.element('table tr:first-child td.movie-Year').to.contain.text('1977');
      client.end();
    });

    it ('shows results in descending order by year when year header first clicked', function(client) {
      client.click('table th.header-Year');
      client.expect.element('table th.header-Year i.fa-sort-desc').to.be.present;
      client.expect.element('table tr:first-child td.movie-Year').to.contain.text('20');
      client.end();
    });

    it ('shows results in ascending order by title when title header first clicked', function(client) {
      client.click('table th.header-Title');
      client.expect.element('table th.header-Title i.fa-sort-asc').to.be.present;
      client.end();
    });

    it ('shows results in descending order by title when title header clicked twice', function(client) {
      client.click('table th.header-Title');
      client.click('table th.header-Title');
      client.expect.element('table th.header-Title i.fa-sort-desc').to.be.present;
      client.end();
    });

    describe('and selecting a movie', function(){
      beforeEach(function(client, done) {
        client
          .click('table tr:first-child td.movie-Title')
          .waitForElementVisible('h3', 500)

        done();
      });

      it ('has url with imdb id', function(client){
        //hardcoded with Star Wars id
        client.assert.urlContains('/movies/tt0076759');
        client.end();
      });

      it ('shows the details of a movie', function(client){
        client.expect.element('h3 span').to.be.present;
        client.expect.element('span#imdb_rating').to.contain.text('IMDB Rating');
        client.end();
      });

      it ('has a link back to search page', function(client){
        client.expect.element('a').to.have.attribute('href').which.matches(/\//);
        client.end();
      });
    });

  });


});
