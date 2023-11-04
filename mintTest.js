const svg2img = require('svg2img');
const Readable  = require('stream');
const pinataSDK = require('@pinata/sdk');

const uploadToIPS = async (buffer) => {
  const pinata = new pinataSDK({
    pinataApiKey: '',
    pinataSecretApiKey: '',
  });

  const stream = Readable.Readable.from(buffer);
  const options = {
    pinataMetadata: {
      name: 'soulmate_image',
    },
  };
  try {
    const { IpfsHash } = await pinata.pinFileToIPFS(stream, options);
    return { url : `ipfs://${IpfsHash}`};
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException('Error pinning image to IPFS');
  }
}

const main = (cellphone) => {
  const fontSize = 20;
  const width = 500;
  const height = 50;
  
  const svgContent = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <text x="${width/2}" y="${fontSize}" font-family="Arial" font-size="${fontSize}" fill="black">${cellphone}</text>
  </svg>`;
  
  svg2img(svgContent, { format: 'png' }, function (error, buffer) {
      if (error) {
          console.error('An error occurred:', error);
      } else {
          (async () => {
            const { url } = await uploadToIPS(buffer);
            console.log(url);
          })();
      }
  });
}
main('1234567890');

