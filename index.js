import linkResolverJSON from "./../../../assets/jsons/link-resolver.json";
const fs = require("fs");

async function checkHeadersFile() {
  const headersFilePath = "./static/_headers";
  const lineToAdd =
    "\n/dato-route-map.json\n  Access-Control-Allow-Origin: *\n";
  if (fs.existsSync(headersFilePath)) {
    const fileContent = fs.readFileSync(headersFilePath, "utf8");
    if (!fileContent.includes(lineToAdd)) {
      return await fs.appendFileSync(headersFilePath, lineToAdd);
    }
  } else {
    return await fs.writeFileSync(headersFilePath, lineToAdd);
  }

}
async function checkJSONFile(array) {
  const filePath = "./static/dato-route-map.json";
  // Check if the file exists
  return await fs.access(filePath, fs.constants.F_OK, async (err) => {
    console.log(err);
    if (!err) {
      // File exists, so delete it
      await fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully.");
        }
      });
    }
    return await fs.writeFile(
      filePath,
      JSON.stringify(array),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
}

export default async function createDatoMap() {
  return await this.nuxt.hook("build:done", async (routes) => {
    console.log("dato route map - START!");
    const array = [];
    routes.forEach((route) => {
      const entryArray = Object.entries(linkResolverJSON).find(
        (entry) =>
          (entry[1].name === route.name) |
          (entry[1].name === route.name.split("___")[0])
      );

      if (entryArray) {
        const entry = {
          path: route.path,
          params: [],
          model: entryArray[0],
        };
        if (entryArray[1].params) {
          Object.entries(entryArray[1].params).forEach((param) => {
            entry.params.push(param[1]);
            entry.path = entry.path.replace(param[0], param[1]);
          });
        }
        if (route.name.includes(`___`)) {
          entry.locale = route.name.split(`___`)[1];
        }
        array.push(entry);
      }
    });
    // write a function that check if the file ./static/headers exists. If it exists check if the file as already a ligne with '/dato-route-map.json' if not add it. If the file do not exist create it and add the ligne '/dato-route-map.json' in it.

    await checkHeadersFile();
    await checkJSONFile(array);
    console.log("dato route map - DONE!");
    return true;
  });
}
