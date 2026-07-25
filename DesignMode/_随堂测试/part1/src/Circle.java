public class Circle extends Shape_{
  public double radius;
  Circle(double r){
    this.radius = r;
  }
  @Override
  public double getArea(){
    return 2 * Math.PI * Math.pow(this.radius, 2);
  }
}
