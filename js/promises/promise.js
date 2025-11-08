class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  area() {
    const area = this.width * this.height;
    return area;
  }
  paint() {
    console.log(`painting this color ${this.color}`);
  }
}
const shape = new Rectangle(2, 4);
const area = shape.area();
console.log(area);
