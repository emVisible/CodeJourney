public class Triangle extends Shape_{
  public double borderLen;
  Triangle(double b){
    this.borderLen = b;
  }
  @Override
  public double getArea(){
    return this.borderLen * (Math.sqrt(3) / 2) / 2;
  }
}
