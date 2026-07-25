public class SmartPhoneBuilder extends AbstractBuilder{
  public SmartPhone smartPhone = new SmartPhone();

  SmartPhoneBuilder(String brand, String camera, int memory, String model, String ratio){
    // this.smartPhone = new SmartPhone();
    this.setBrand(brand);
    this.setCamera(camera);
    this.setMemory(memory);
    this.setModel(model);
    this.setResolutionRatio(ratio);
  }
  public Phone getInstance(){
    return this.smartPhone;
  }

  @Override
  public void setBrand(String newBrand) {
    this.smartPhone.brand = newBrand;
  }

  @Override
  public void setCamera(String newCamera) {
    this.smartPhone.camera = newCamera;
  }

  @Override
  public void setMemory(int newMemory) {
    this.smartPhone.memory = newMemory;
  }

  @Override
  public void setModel(String newModel) {
    this.smartPhone.model = newModel;
  }

  @Override
  public void setResolutionRatio(String newRatio) {
    this.smartPhone.resolutionRatio = newRatio;
  }

}
