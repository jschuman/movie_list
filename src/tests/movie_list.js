describe('Movie Search Tests', () => {

  describe('when conducting a search', () => {

    beforeEach( (client, done) => {
      client
        .url('http://localhost:8080')
        .waitForElementVisible('body', 1000)
        .setValue('input.search-input', 'star wars')
        .waitForElementVisible('button.search-btn', 1000)
        .click('button.search-btn')
        .waitForElementVisible('table tr:first-child td.movie-Year', 500)

      done();
    });

    it ('shows results', (client) => {
      client.expect.element('.table').to.contain.text('A New Hope');
    });

    it ('retains search string in search input field', (client) => {
      client.expect.element('input.search-input').to.contain.value('star wars')
    });

    it ('shows results in ascending order by year by default', (client) => {
      client.expect.element('table th.header-Year i.fa-sort-asc').to.be.present;
      client.expect.element('table tr:first-child td.movie-Year').to.contain.text('1977')
    });

    it ('shows results in descending order by year when year header first clicked', (client) => {
      client.click('table th.header-Year');
      client.expect.element('table th.header-Year i.fa-sort-desc').to.be.present;
      client.expect.element('table tr:first-child td.movie-Year').to.contain.text('20')
    });

    it ('shows results in ascending order by title when title header first clicked', (client) => {
      client.click('table th.header-Title');
      client.expect.element('table th.header-Title i.fa-sort-asc').to.be.present
    });

    it ('shows results in descending order by title when title header clicked twice', (client) => {
      client.click('table th.header-Title');
      client.click('table th.header-Title');
      client.expect.element('table th.header-Title i.fa-sort-desc').to.be.present
    });

    describe('and selecting a movie', () => {
      beforeEach( (client, done) => {
        client
          .click('table tr:first-child td.movie-Title')
          .waitForElementVisible('h3', 500)

        done();
      });

      it ('has url with imdb id', (client) => {
        //hardcoded with Star Wars id
        client.assert.urlContains('/movies/tt0076759');
      });

      it ('shows the details of a movie', (client) => {
        client.expect.element('h3 span').to.be.present;
        client.expect.element('span#imdb_rating').to.contain.text('IMDB Rating');
      });

      it ('has a link back to search page', (client) => {
        client.expect.element('a').to.have.attribute('href').equals('http://localhost:8080/');
      });
    });

  });

  after( (client, done) => {
    client.end();
    done();
  });

});
