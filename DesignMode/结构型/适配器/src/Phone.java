public class Phone implements USBCharger{
  Phone(){}
  @Override
  public Boolean chargeWithUSB(String voltage) {
    return voltage.equals("5V");
  }
}
