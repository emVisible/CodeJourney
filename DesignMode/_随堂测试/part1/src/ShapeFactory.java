public class ShapeFactory {
  public String shape;
  public Shape_ instance;
  ShapeFactory(String s) {
    this.shape = s;
  }
  public Shape_ getShape(String s) {
    switch (this.shape) {
      case "circle" -> {
        this.instance = new Circle(2);
      }
      case "rectangle" -> {
        this.instance = new Rectangle(3, 5);
      }
      case "triangle" -> {
        this.instance = new Triangle(2);
      }
    }
    return this.instance;
  }
}
