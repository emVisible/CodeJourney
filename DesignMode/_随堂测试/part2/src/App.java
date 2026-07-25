public class App {
    public static void main(String[] args) throws Exception {
      PhoneFactory factory = new PhoneFactory();
      SmartPhone smartPhone = factory.createSmartPhone("HUAWEI", "Lycra", 16, "p40", "2k");
      FeaturePhone featurePhone = factory.createFeaturePhone("Nokia", "normal camera", 2, "a32", "1k");
      // System.out.println(smartPhone.brand);
      smartPhone.getPhoneMsg();
      featurePhone.getPhoneMsg();
    }
}