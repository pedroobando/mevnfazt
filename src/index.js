import app from './app';
import '@babel/polyfill';

const thePort = process.env.PORT || 8080;

async function main() {
  await app.listen(thePort);
  console.log(`Server on port ${thePort}`);
}

main();