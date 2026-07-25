package component;

public class Hair {
    public String color;
    public String length;
    public String thickness;
    public Hair(String color, String length, String thickness){
        this.color = color;
        this.length = length;
        this.thickness = thickness;
    }
    public String getHairColor(){
        return this.color;
    }
    public String getHairLength(){
        return this.length;
    }
    public String getHairThickness(){
        return this.thickness;
    }
    public String getHairMsg(){
        return "头发长度: " + this.getHairLength() + "\t" +
                "头发颜色: " + this.getHairColor() + "\t" +
                "头发粗细: " + this.getHairThickness() + "\n";
    }
}
