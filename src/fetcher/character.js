/**
  * Character fetcher
  *
  * @param  {cheerio} $
  * @return this
  */

function Character($){

  this.character = {};
  this.achievements = [];
  this.deaths = [];
  this.account = {};
  this.characters = [];

  var self = this;

  var getWrapper = function(key){
    return $('b:contains("' + key + '")').closest('table');
  };

  getWrapper('Character Information')
  .find('tr:nth-child(n+2)')
  .each(function(){
    var index = $(this).find('td:nth-child(1)').text()
      .replace(':', '')
      .replace(' ', '_')
      .replace(String.fromCharCode(160), '_') // &nbsp;
      .toLowerCase();
    var value = $(this).find('td:nth-child(2)').text().trim();
    self.character[index] = value;
  });

  getWrapper('Account Achievements')
  .find('tr:nth-child(n+2)')
  .each(function(){
    var value = {
      grade: $(this).find('td:nth-child(1) img').length,
      name: $(this).find('td:nth-child(2)').text().trim(),
      secret: $(this).find('td:nth-child(2) img').length === 1
    };
    self.achievements.push(value);
  });

  getWrapper('Character Deaths')
  .find('tr:nth-child(n+2)')
  .each(function(){
    var value = {
      date: $(this).find('td:nth-child(1)').text()
            .replace(String.fromCharCode(160), ' ').replace('CET', '').trim(),
      level: parseInt($(this).find('td:nth-child(2)').text().match(/[0-9]+/g)[0]),
      by: $(this).find('td:nth-child(2)').text().match(/\D+/g)[1]
          .replace('by an').replace('by a', '').replace('by', '')
          .replace('.', '').replace(' and ',', ').trim().split(', ')
    };
    self.deaths.push(value);
  });

  getWrapper('Account Information')
  .find('tr:nth-child(n+2)')
  .each(function(){
    var index = $(this).find('td:nth-child(1)').text()
      .replace(':', '')
      .replace(' ', '_')
      .replace(String.fromCharCode(160), '_') // &nbsp;
      .toLowerCase();
    var value = $(this).find('td:nth-child(2)').text().trim();
    self.account[index] = value;
  });

  getWrapper('Characters')
  .find('tr:nth-child(n+3)')
  .each(function(){
    var value = {
      name: $(this).find('td:nth-child(1)').find('input[type=hidden]').val(),
      world: $(this).find('td:nth-child(2)').text(),
      online: $(this).find('td:nth-child(3)').text() === 'online'
    };
    self.characters.push(value);
  });

  return this;
}

module.exports = Character;