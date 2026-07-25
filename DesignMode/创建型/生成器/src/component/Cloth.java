package component;

public class Cloth {
    public String style;
    public String color;
    public Cloth(String style, String color){
        this.style = style;
        this.color = color;
    }
    String getStyle(){
        return this.style;
    }
    String getColor(){
        return this.color;
    }
    public String getClothMsg(){
        return "衣服款式: " + this.getStyle() + "\t" + "衣服颜色: " + this.getColor() + "\n";
    }
}
