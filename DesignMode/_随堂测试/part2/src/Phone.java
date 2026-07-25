public class Phone {
  public String brand;
  public String model;
  public int memory;
  public String resolutionRatio;
  public String camera;

  public void getPhoneMsg(){
    System.out.println("品牌: " + this.brand + "\n"
                  + "型号: " + this.model + "\n"
                  + "内存: " + this.memory + "\n"
                  + "屏幕分辨率: " + this.resolutionRatio + "\n"
                  + "摄像头规格: " + this.camera + "\n");
  }
}
