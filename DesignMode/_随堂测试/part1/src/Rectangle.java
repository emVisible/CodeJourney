public class Rectangle extends Shape_{
  public double width;
  public double height;
  Rectangle(double w, double h){
    this.width = w;
    this.height = h;
  }
  @Override
  public double getArea(){
    return this.width * this.height;
  }
}
