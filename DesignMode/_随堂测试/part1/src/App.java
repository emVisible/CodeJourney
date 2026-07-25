import java.util.ArrayList;

public class App {
    public static void main(String[] args) throws Exception {
      ShapeFactory triangle = new ShapeFactory("triangle");
      ShapeFactory rectangle = new ShapeFactory("rectangle");
      ShapeFactory circle  = new ShapeFactory("circle");
      ArrayList <Shape_> arr = new ArrayList<>();
      arr.add(triangle.instance);
      arr.add(rectangle.instance);
      arr.add(circle.instance);
      for (Shape_ s: arr) {
        double tmp = s.getArea();
        System.out.println(tmp);
      }
    }
}
