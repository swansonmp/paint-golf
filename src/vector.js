export default class Vector {
  constructor(x, y, z) { 
    if (x == undefined) this.x = 0;
    else this.x = x;
    if (y == undefined) this.y = 0;
    else this.y = y;
    if (z == undefined) this.z = 0;
    else this.z = z;
  }
  
  setComponents(x, y, z) {
    if (x == undefined) this.x = 0;
    else this.x = x;
    if (y == undefined) this.y = 0;
    else this.y = y;
    if (z == undefined) this.z = 0;
    else this.z = z;
  }
  
  add(v2) {
    return new Vector(
        this.x + v2.x,
        this.y + v2.y,
        this.z + v2.z
    );
  }
  
  addTo(v2) {
    this.x += v2.x;
    this.y += v2.y;
    this.z += v2.z;
  }
  
  subtract(v2) {
    return new Vector(
        this.x - v2.x,
        this.y - v2.y,
        this.z - v2.z
    );
  }
  
  subtractFrom(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
    this.z -= v2.z;
  }
  
  multiply(v2) {
    if (v2 instanceof Vector) {
      return new Vector(
          this.x * v2.x,
          this.y * v2.y,
          this.z * v2.z
      );
    }
    else {
      return new Vector(
          this.x * v2,
          this.y * v2,
          this.z * v2
      );
    }
  }
  
  multiplyBy(v2) {
    if (v2 instanceof Vector) {
      this.x *= v2.x;
      this.y *= v2.y;
      this.z *= v2.z;
    }
    else {
      this.x *= v2;
      this.y *= v2;
      this.z *= v2;
    }
  }
  
  divide(v2) {
    if (v2 instanceof Vector) {
      return new Vector(
          this.x / v2.x,
          this.y / v2.y,
          this.z / v2.z
      );
    }
    else {
      return new Vector(
          this.x / v2,
          this.y / v2,
          this.z / v2
      );
    }
  }
  
  divideBy(v2) {
    if (v2 instanceof Vector) {
      this.x /= v2.x;
      this.y /= v2.y;
      this.z /= v2.z;
    }
    else {
      this.x /= v2;
      this.y /= v2;
      this.z /= v2;
    }
  }
  
  rotate(theta) {
    let x = this.x;
    this.x = x * Math.cos(theta) - this.y * Math.sin(theta);
    this.y = x * Math.sin(theta) + this.y * Math.cos(theta);
  }
  
  fromPolar(theta, r) {
    this.setComponents(Math.cos(theta) * r, Math.sin(theta) * r);
  }
  
  mag() {
    return Math.sqrt(
        Math.pow(this.x, 2) + 
        Math.pow(this.y, 2) + 
        Math.pow(this.z, 2)
    );
  }
  
  distance2D(v2) {
    return Math.sqrt(Math.pow(this.x - v2.x, 2) + Math.pow(this.y - v2.y, 2));
  }
  
  equals(v2) {
    if (v2 instanceof Vector) {
      return this.x == v2.x && this.y == v2.y && this.z == v2.z;
    }
    else return false;
  }
  
  toString(digits) {
    if (digits == undefined) digits = 2;
    return this.x.toFixed(digits) + "," + this.y.toFixed(digits) + "," + this.z.toFixed(digits);
  }
  
  copy() {
    return new Vector(
      this.x,
      this.y,
      this.z
    );
  }
}