public class TCLTelevision implements Television{
  public Object[] channels = {"tcl c1", "tcl c2", "tcl c3"};

  @Override
  public TVIterator createIterator() {
    return new TCLIterator();
  }

  class TCLIterator implements TVIterator {
    private int index = 0;

    @Override
    public Object currentChannel() {
      return channels[index].toString();
    }

    @Override
    public boolean isFirst() {
      return index == 0;
    }

    @Override
    public boolean isLast() {
      return index == channels.length - 1;
    }

    @Override
    public void next() {
      index++;
    }

    @Override
    public void previous() {
      index--;
    }

    @Override
    public void setChannel(int i) {
      index = i;
    }
  }

}