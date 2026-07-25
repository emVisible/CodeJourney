package component;

public class Face {
    public String type;
    public String length;
    public String width;
    public Face(String type, String length, String width){
        this.type = type;
        this.length = length;
        this.width = width;
    }
    public String getFaceType(){
        return this.type;
    }
    public String getFaceLength(){
        return this.length;
    }

    public String getFaceWidth(){
        return this.width;
    }
    public String getFaceMsg(){
        return "脸型: " + this.getFaceType() + "\t" +
                "脸长: " + this.getFaceLength()+ "\t" +
                "脸宽: " + this.getFaceWidth()+ "\n";
    }
}
