public abstract class sShape {
    public String id;
    public String name;
    public String author;
    public String price;
    public sShape(){}
    public sShape(sShape source){
        if (source != null) {
            this.id = source.id;
            this.name = source.name;
            this.author = source.author;
            this.price = source.price;
        }
    }

    public abstract sShape cloneBook();
}
