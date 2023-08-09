const inquirer = require("inquirer");
const SVG = require("./SVG");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
  run() {
    return inquirer
      .prompt([
        {
          name: "text",
          type: "input",
          message:
            "Choose logo text. [Three characters or less]",
          validate: (text) =>
            text.length <= 3 ||
            "Logo text must be three characters or less",
        },
        {
          name: "color",
          type: "input",
          message: "Choose a text color",
        },
        {
          name: "shapeType",
          type: "list",
          message: "Choose a logo shape.",
          choices: ["Circle", "Square", "Triangle"],
        },
        {
          name: "backgroundColor",
          type: "input",
          message: "Choose a background color",
        },
      ])
      .then(({ text, textColor, shapeType, shapeColor }) => {
        let shape;
        switch (shapeType) {
          case "Circle":
            shape = new Circle();
            break;

          case "Square":
            shape = new Square();
            break;

          default:
            shape = new Triangle();
            break;
        }
        shape.setColor(shapeColor);

        const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shape);
        return writeFile("logo.svg", svg.render());
      })
      .then(() => {
        console.log("Generated logo.svg");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  }
}

module.exports = CLI;

