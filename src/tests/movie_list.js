describe('Movie Search Tests', function () {

  describe('when conducting a search', function() {

    beforeEach(function(client, done) {
      client
        .url('http://localhost:8080')
        .waitForElementVisible('body', 1000)
        .setValue('input.search-input', 'star wars')
        .waitForElementVisible('button.search-btn', 1000)
        .click('button.search-btn')
        .pause(1000)

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
      client.click('table th.header-Year')
      client.expect.element('table th.header-Year i.fa-sort-desc').to.be.present;
      client.getText('table tr:first-child td.movie-Year', function(result){
        console.log('result: ' + result.value);
        this.assert.equal(result.value, '2015');
      })
      client.end();
    });

  });

});
