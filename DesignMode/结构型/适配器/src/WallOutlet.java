/*
 * 墙壁
*/
public class WallOutlet {
  public String voltage;
  WallOutlet(){
    this.voltage = "220V";
  }
  public String provideElectricity(){
    return this.voltage;
  }
}