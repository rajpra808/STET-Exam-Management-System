const fs = require("fs");
const path = require("path");

const baseRepositoryPath = "./otpItems";

function add(otpItem) {
  checkBaseFolder();
  fs.writeFileSync(path.join(baseRepositoryPath, `${otpItem.token}-${otpItem.code}`), JSON.stringify(otpItem));
}

function getById(id) {
  const content = getFileContent(path.join(baseRepositoryPath, id));
  let otpItem = null;
  
  if (content) {
    otpItem = JSON.parse(content);
  }

  return otpItem;
}

function update(otpItem) {
    fs.writeFileSync(path.join(baseRepositoryPath, `${otpItem.token}-${otpItem.code}`), JSON.stringify(otpItem));

    return otpItem;
}

function checkBaseFolder() {
  if (!fs.existsSync(baseRepositoryPath)){
    fs.mkdirSync(baseRepositoryPath);
  }
}

function getFileContent(fileName) {
  let content = null;
  
  try {
    content = fs.readFileSync(fileName);
  } catch (error) {
    console.log(error);
  }

  return content;
}

module.exports = {
  getById,
  add,
  update
};