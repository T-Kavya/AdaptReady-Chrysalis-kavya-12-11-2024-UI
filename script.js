const fs = require('fs');
const csv = require('csvtojson');

const convertCsvToJson = async () => {
  const csvFilePath = './indian_food.csv'
  const jsonOutputPath = './indian_food.json';

  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    jsonArray.forEach(ele => {
      ele.ingredients = ele.ingredients.split(',');
        if(ele.prep_time < 0){
          ele.prep_time = 'NA';
        }
        if(ele.cook_time < 0){
          ele.cook_time = 'NA';
        }
        if(ele.state === '-1'){
          ele.state = 'NA';
        }
        if(ele.region === '-1'){
          ele.region = 'NA';
        }
        if(ele.flavor_profile === '-1'){
          ele.flavor_profile = 'NA';
        }
    })
    console.log(jsonArray);

    fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonArray, null, 2));
    console.log('CSV file successfully converted to JSON.');
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
  }
};

convertCsvToJson();
