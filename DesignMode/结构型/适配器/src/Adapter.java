public class Adapter extends WallOutlet{
  WallOutlet App;
  Adapter(WallOutlet app){
    this.App = app;
  }

  @Override
  public String provideElectricity() {
    this.App.voltage = "5V";
    return this.App.voltage;
  }
}