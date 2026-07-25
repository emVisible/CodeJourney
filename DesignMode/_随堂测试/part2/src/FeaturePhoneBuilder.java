public class FeaturePhoneBuilder extends AbstractBuilder{
  public FeaturePhone featurePhone = new FeaturePhone();

  FeaturePhoneBuilder(String brand, String camera, int memory, String model, String ratio){
    this.setBrand(brand);
    this.setCamera(camera);
    this.setMemory(memory);
    this.setModel(model);
    this.setResolutionRatio(ratio);
  }
  public Phone getInstance(){
    return this.featurePhone;
  }
  @Override
  public void setBrand(String newBrand) {
    this.featurePhone.brand = newBrand;
  }

  @Override
  public void setCamera(String newCamera) {
    this.featurePhone.camera = newCamera;
  }

  @Override
  public void setMemory(int newMemory) {
    this.featurePhone.memory = newMemory;
  }

  @Override
  public void setModel(String newModel) {
    this.featurePhone.model = newModel;
  }

  @Override
  public void setResolutionRatio(String newRatio) {
    this.featurePhone.resolutionRatio = newRatio;
  }

}
