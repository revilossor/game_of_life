interface Neighbours<T> {
  topLeft: T | null;
  top: T | null;
  topRight: T | null;
  left: T | null;
  right: T | null;
  bottomLeft: T | null;
  bottom: T | null;
  bottomRight: T | null;
}

export default Neighbours;
