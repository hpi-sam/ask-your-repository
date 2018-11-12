import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import chaiChange from 'chai-change';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.testing' });

chai.should();
chai.use(sinonChai);
chai.use(chaiChange);

global.expect = chai.expect;
global.sinon = sinon;
