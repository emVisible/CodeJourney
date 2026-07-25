public class PhoneFactory {
  public AbstractBuilder smartBuilder;
  public AbstractBuilder featureBuilder;
  PhoneFactory(){}

  public SmartPhone createSmartPhone(String brand, String camera, int memory, String model, String resolutionRatio) {
    this.smartBuilder = new SmartPhoneBuilder(brand, camera, memory, model, resolutionRatio);
    System.out.println("创建SmartPhone");
    return  (SmartPhone) this.smartBuilder.getInstance();
  }
  public FeaturePhone createFeaturePhone(String brand, String camera, int memory, String model, String resolutionRatio) {
    this.featureBuilder = new FeaturePhoneBuilder(brand, camera, memory, model, resolutionRatio);
    System.out.println("创建FeaturePhone");
    return (FeaturePhone) this.featureBuilder.getInstance();
  }
}
