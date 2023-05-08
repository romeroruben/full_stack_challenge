const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const expect = chai.expect;
describe('Test routes', () => {
 
  it('should return a data from files on /files/data', async () => {
    const res = await chai.request(server).get('/files/data');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[1].lines).to.be.an('array');
    expect(res.body[1].lines[0].text).to.not.be.empty;
    expect(res.body[1].lines[0].number).to.be.a('number');
    expect(res.body[1].lines[0].hex).to.not.be.empty;
  });
});