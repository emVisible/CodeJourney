
public class Main {
  public static void main(String[] args) {
    WallOutlet wallOutlet = new WallOutlet();
    Phone phone = new Phone();
    Adapter adapter = new Adapter(wallOutlet);

    Boolean isChargedDefault = phone.chargeWithUSB(wallOutlet.provideElectricity());
    Boolean isChargedAdapted = phone.chargeWithUSB(adapter.provideElectricity());
    
    System.out.println(isChargedDefault ? "充电成功" : "充电失败" );
    System.out.println(isChargedAdapted ? "充电成功": "充电失败");
  }
}
