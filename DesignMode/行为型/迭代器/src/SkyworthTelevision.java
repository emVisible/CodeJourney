public class SkyworthTelevision implements Television {

  public Object[] channels = { "c1", "c2", "c3" };

  @Override
  public TVIterator createIterator() {
    return new SkyworthIterator();
  }

  public class SkyworthIterator implements TVIterator {
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